import React, { useState } from "react";
import { StateMachineProvider, createStore, useStateMachine } from "little-state-machine";
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
  const [counter, setCounter] = useState(0);

  const AdicionarEscalao = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCount) => prevCount + 1);
  };

  const RemoverEscalao = (index) => () => {
    setIndexes((prevIndexes) => [...prevIndexes.filter((item) => item !== index)]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  //Save Data
  const onSubmit = (data) => {
    actions.updateAction(data);
    console.log("See your Data:", data);
  };

  return (
    <React.Fragment>
      <h1>Dynamic Form with React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {indexes.map((index) => {
            return (
              <div key={index}>
                <label>
                  Category Name
                  <input ref={register({required: true})} name={`categories[${index}].categoryName`} placeholder="LastName" />
                </label>
                <label>
                  Category Description
                  <input ref={register({required: true})} name={`categories[${index}].categoryDescription`} placeholder="LastName" />
                </label>
                <button type="button" onClick={RemoverEscalao(index)}>
                  Remover
                </button>
              </div>
            );
          })}
          <button type="button" onClick={AdicionarEscalao}>
            Adicionar
          </button>
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
