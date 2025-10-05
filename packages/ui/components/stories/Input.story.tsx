import Input from "../Input";
export default {
    title: "UI/Core/Input",
};

export const FocusInput = () => <Input label="Email" required />;

export const InputWithCustomBorderColor = () => (
    <Input style={{ borderColor: "purple" }} />
);
