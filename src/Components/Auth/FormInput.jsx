import "./css/formInput.css"

const FormInput = (props) => {

    const {lable, errorMessage, onChange, id, ...inputProps} = props; //Props till inputfälten.
    
    return( //Uppbyggnaden utav varje inputfält.
        <div className="formInput"> 
            <label className="form-lable">{lable}</label>
            <input {...inputProps} onChange={onChange} className="form-input"/>
            <span className="form-error-message">{errorMessage}</span>
        </div>
    )
}

export default FormInput