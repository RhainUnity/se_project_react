// AddItemModal.jsx
import { useRef, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm.js";

const defaultValues = {
  name: "",
  weatherType: "",
  imageUrl: "",
};

const AddItemModal = ({ isOpen, onAddItem, closeModal, buttonText }) => {
  const { values, handleChange, isValid, resetForm } = useForm(defaultValues);
  const formRef = useRef(null);
  // const [canSubmit, setCanSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // useEffect(() => {
  //   if (!formRef.current) return;
  //   setCanSubmit(formRef.current.checkValidity());
  // }, [values]);

  // useEffect(() => {
  //   if (!isOpen) return;
  //   setValues(defaultValues);
  //   setSubmitting(false);
  //   if (formRef.current) {
  //     formRef.current.reset();
  //   }
  // }, [isOpen, setValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formRef.current?.checkValidity() || submitting) return;

    try {
      setSubmitting(true);
      await onAddItem(values);
      resetForm(defaultValues, {}, false);
      closeModal();
    } catch (err) {
      console.error("Add item failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      closeModal={closeModal}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      isOpen={isOpen}
      formRef={formRef}
      submitDisabled={!isValid || submitting}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name || ""}
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
          value={values.imageUrl || ""}
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
