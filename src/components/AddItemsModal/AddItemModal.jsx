import { useRef, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm.js";

const AddItemModal = ({ isOpen, onAddItem, closeModal, buttonText }) => {
  const defaultValues = {
    name: "",
    weatherType: "",
    imageUrl: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);

  const formRef = useRef(null);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setCanSubmit(formRef.current?.checkValidity() ?? false);
  }, [values]);

  function handlesubmit(e) {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) return;
    onAddItem(values);
    closeModal();
    setValues({ name: "", weatherType: "", imageUrl: "" });
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      closeModal={closeModal}
      onSubmit={handlesubmit}
      buttonText={buttonText}
      isOpen={isOpen}
      formRef={formRef}
      submitDisabled={!canSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          name="imageUrl"
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            onChange={handleChange}
            value="hot"
            checked={values.weatherType === "hot"}
            required
          />
          Hot
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            onChange={handleChange}
            value="cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            checked={values.weatherType === "cold"}
          />
          Cold
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            onChange={handleChange}
            value="warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            checked={values.weatherType === "warm"}
          />
          Warm
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
