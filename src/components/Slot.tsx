import './components.css';

function Slot({coord}:{coord:string}){

    const elementProps = {className:'slot',coord} /// Tenemos que definir los props afuera porque en TS, el elemento div no tiene la prop coord.
    return (
    <div {...elementProps} > 
        {<span>{coord}</span>}
    </div>
    )
}

export default Slot;