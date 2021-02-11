import React, { useState } from "react";
import {
  StateMachineProvider,
  createStore,
  useStateMachine,
} from "little-state-machine";
import { useForm, useFieldArray, useWatch } from "react-hook-form";

createStore({
  yourDetails: {
    firstName: "",
    lastName: "",
    categories: [],
  },
});

function updateAction(state, payload) {
  return {
    ...state,
    yourDetails: {
      ...state.yourDetails,
      ...payload,
    },
  };
}

const Page = () => {
  const { state, actions } = useStateMachine({ updateAction });
  const { handleSubmit, register, control } = useForm({
    defaultValues: state.yourDetails,
  });
  const [indexes, setIndexes] = useState([]);
  const [contador, setContador] = useState(0);

  const AdicionarEscalao = () => {
    setIndexes((prevIndexes) => [...prevIndexes, contador]);
    setContador((prevContador) => prevContador + 1);
  };

  //Save Data
  const onSubmit = (data) => {
    actions.updateAction(data);
    console.log(data)
    //console.log(state);
  };

  return (
    <React.Fragment>
      <h1>Dynamic Form with React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} name="firstName" placeholder="First Name"></input>
        <input ref={register} name="lastName" placeholder="LastName"></input>
        <div>
          {indexes.map((index) => {
            return (
              <div key={index}>
                <input
                  ref={register}
                  name={`categories[${index}].categoryName`}
                  placeholder="LastName"
                ></input>
                <input
                  ref={register}
                  name={`categories[${index}].categoryDescription`}
                  placeholder="LastName"
                ></input>
                
              </div>
            );
          })}
          <button onClick={AdicionarEscalao}>Adicionar</button>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </React.Fragment>
  );
};

function App() {
  return (
    <StateMachineProvider>
      <Page />
    </StateMachineProvider>
  );
}

export default App;
