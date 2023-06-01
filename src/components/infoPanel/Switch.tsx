import './Switch.css';

interface SwitchProps {
  handleFunction: ()=>void;
  state:boolean,
  id:string,
}

const Switch:React.FC<SwitchProps> = ({handleFunction,state,id}) => {
    const stateUndef = state?true:undefined /// Para resolver error de backgroundColor undefined|color.
    return (
    <>
      <input
        checked={state}
        onChange={handleFunction}
        className="react-switch-checkbox"
        id={id}
        type="checkbox"
      />
      <label
        style={{backgroundColor: stateUndef && '#06D6A0'}}
        className="react-switch-label"
        htmlFor={id}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;