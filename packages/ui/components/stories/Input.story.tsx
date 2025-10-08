// import { useState } from "react";
// import Input from "../Input";

// export default {
//     title: "UI/Core/Input",
// };

// // ==================== BASIC INPUTS ====================
// export const Default = () => <Input placeholder="Enter text..." />;

// export const WithLabel = () => <Input label="Username" placeholder="johndoe" />;

// export const WithValue = () => (
//     <Input label="Email" value="user@example.com" readOnly />
// );

// export const WithPlaceholder = () => (
//     <Input label="Search" placeholder="Search for anything..." />
// );

// // ==================== INPUT TYPES ====================
// export const EmailInput = () => (
//     <Input type="email" label="Email Address" placeholder="you@example.com" />
// );

// export const PasswordInput = () => (
//     <Input type="password" label="Password" placeholder="Enter your password" />
// );

// export const PasswordWithToggle = () => (
//     <Input
//         type="password"
//         label="Password"
//         placeholder="••••••••"
//         showPasswordToggle
//     />
// );

// export const NumberInput = () => (
//     <Input type="number" label="Age" placeholder="25" min={0} max={120} />
// );

// export const TelInput = () => (
//     <Input type="tel" label="Phone" placeholder="+1 (555) 000-0000" />
// );

// export const UrlInput = () => (
//     <Input type="url" label="Website" placeholder="https://example.com" />
// );

// export const SearchInput = () => (
//     <Input type="search" label="Search" placeholder="Search products..." />
// );

// export const DateInput = () => <Input type="date" label="Birth Date" />;

// export const TimeInput = () => <Input type="time" label="Appointment Time" />;

// // ==================== SIZES ====================
// export const SmallSize = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//         <Input size="sm" label="Small Input" placeholder="Small size" />
//         <Input
//             size="md"
//             label="Medium Input"
//             placeholder="Medium size (default)"
//         />
//         <Input size="lg" label="Large Input" placeholder="Large size" />
//     </div>
// );

// // ==================== VARIANTS / STATES ====================
// export const ErrorState = () => (
//     <Input
//         label="Email"
//         value="invalid-email"
//         error="Please enter a valid email address"
//     />
// );

// export const SuccessState = () => (
//     <Input label="Username" value="johndoe" variant="success" />
// );

// export const WithHelperText = () => (
//     <Input
//         label="Password"
//         type="password"
//         helperText="Must be at least 8 characters with 1 number and 1 special character"
//     />
// );

// export const ErrorOverridesHelperText = () => (
//     <Input
//         label="Password"
//         type="password"
//         value="abc"
//         helperText="Must be at least 8 characters"
//         error="Password is too short"
//     />
// );

// // ==================== REQUIRED FIELD ====================
// export const RequiredField = () => (
//     <Input label="Email" required placeholder="you@example.com" />
// );

// export const RequiredWithAsterisk = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//         <Input label="First Name" required />
//         <Input label="Last Name" required />
//         <Input label="Middle Name (Optional)" />
//     </div>
// );

// // ==================== DISABLED & READONLY ====================
// export const DisabledInput = () => (
//     <Input label="Disabled Field" value="Cannot edit this" disabled />
// );

// export const ReadOnlyInput = () => (
//     <Input label="Read Only Field" value="Read only value" readOnly />
// );

// export const DisabledVsReadOnly = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//         <Input label="Disabled" value="Disabled input" disabled />
//         <Input label="Read Only" value="Read only input" readOnly />
//         <Input label="Normal" value="Editable input" />
//     </div>
// );

// // ==================== ICONS / ADORNMENTS ====================
// export const WithLeftIcon = () => (
//     <Input label="Search" placeholder="Search..." leftIcon={<span>🔍</span>} />
// );

// export const WithRightIcon = () => (
//     <Input
//         label="Email"
//         placeholder="you@example.com"
//         value="user@example.com"
//         rightIcon={<span>✓</span>}
//     />
// );

// export const WithBothIcons = () => (
//     <Input
//         label="Amount"
//         placeholder="0.00"
//         leftIcon={<span>$</span>}
//         rightIcon={<span>USD</span>}
//     />
// );

// export const IconExamples = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//         <Input placeholder="Search" leftIcon={<span>🔍</span>} />
//         <Input placeholder="Email" leftIcon={<span>✉️</span>} />
//         <Input placeholder="Phone" leftIcon={<span>📱</span>} />
//         <Input placeholder="Location" leftIcon={<span>📍</span>} />
//         <Input placeholder="Password" leftIcon={<span>🔒</span>} />
//     </div>
// );

// // ==================== FULL WIDTH ====================
// export const FullWidth = () => (
//     <Input
//         label="Full Width Input"
//         placeholder="Spans entire width"
//         fullWidth
//     />
// );

// export const FullWidthForm = () => (
//     <div style={{ maxWidth: "600px", margin: "0 auto" }}>
//         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//             <Input label="Full Name" fullWidth required />
//             <Input label="Email Address" type="email" fullWidth required />
//             <Input label="Phone Number" type="tel" fullWidth />
//             <Input label="Company" fullWidth />
//         </div>
//     </div>
// );

// // ==================== VALIDATION ====================
// export const WithValidation = () => {
//     const [email, setEmail] = useState("");
//     const [error, setError] = useState("");

//     const validateEmail = (value: string) => {
//         if (!value) {
//             setError("Email is required");
//         } else if (!/\S+@\S+\.\S+/.test(value)) {
//             setError("Invalid email format");
//         } else {
//             setError("");
//         }
//     };

//     return (
//         <Input
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => {
//                 setEmail(e.target.value);
//                 validateEmail(e.target.value);
//             }}
//             onBlur={(e) => validateEmail(e.target.value)}
//             error={error}
//             required
//         />
//     );
// };

// export const ValidationRules = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//         <Input
//             label="Username"
//             minLength={3}
//             maxLength={20}
//             helperText="3-20 characters"
//         />
//         <Input
//             label="Age"
//             type="number"
//             min={18}
//             max={100}
//             helperText="Must be 18 or older"
//         />
//         <Input
//             label="Zip Code"
//             pattern="[0-9]{5}"
//             helperText="5 digit zip code"
//         />
//     </div>
// );

// // ==================== CONTROLLED vs UNCONTROLLED ====================
// export const ControlledInput = () => {
//     const [value, setValue] = useState("");

//     return (
//         <div>
//             <Input
//                 label="Controlled Input"
//                 value={value}
//                 onChange={(e) => setValue(e.target.value)}
//                 placeholder="Type something..."
//             />
//             <p style={{ marginTop: "8px", color: "#6b7280" }}>
//                 Current value: {value || "(empty)"}
//             </p>
//         </div>
//     );
// };

// export const UncontrolledInput = () => (
//     <Input
//         label="Uncontrolled Input"
//         defaultValue="Initial value"
//         placeholder="Type something..."
//     />
// );

// // ==================== FORM EXAMPLE ====================
// export const LoginForm = () => {
//     const [formData, setFormData] = useState({ email: "", password: "" });
//     const [errors, setErrors] = useState({ email: "", password: "" });

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const newErrors = { email: "", password: "" };

//         if (!formData.email) {
//             newErrors.email = "Email is required";
//         }
//         if (!formData.password) {
//             newErrors.password = "Password is required";
//         } else if (formData.password.length < 8) {
//             newErrors.password = "Password must be at least 8 characters";
//         }

//         setErrors(newErrors);

//         if (!newErrors.email && !newErrors.password) {
//             alert("Form submitted!");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
//             <div
//                 style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "16px",
//                 }}
//             >
//                 <Input
//                     label="Email"
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                     }
//                     error={errors.email}
//                     required
//                     fullWidth
//                 />
//                 <Input
//                     label="Password"
//                     type="password"
//                     value={formData.password}
//                     onChange={(e) =>
//                         setFormData({ ...formData, password: e.target.value })
//                     }
//                     error={errors.password}
//                     required
//                     fullWidth
//                 />
//                 <button
//                     type="submit"
//                     style={{
//                         padding: "12px",
//                         backgroundColor: "#2563eb",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "8px",
//                         cursor: "pointer",
//                     }}
//                 >
//                     Sign In
//                 </button>
//             </div>
//         </form>
//     );
// };

// export const RegistrationForm = () => (
//     <div style={{ maxWidth: "500px" }}>
//         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//             <Input label="Full Name" required fullWidth />
//             <Input label="Email" type="email" required fullWidth />
//             <Input label="Phone" type="tel" fullWidth />
//             <Input
//                 label="Password"
//                 type="password"
//                 required
//                 fullWidth
//                 helperText="At least 8 characters"
//             />
//             <Input
//                 label="Confirm Password"
//                 type="password"
//                 required
//                 fullWidth
//             />
//         </div>
//     </div>
// );

// // ==================== AUTOCOMPLETE ====================
// export const WithAutocomplete = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//         <Input label="Name" autoComplete="name" />
//         <Input label="Email" type="email" autoComplete="email" />
//         <Input label="Phone" type="tel" autoComplete="tel" />
//         <Input label="Address" autoComplete="address-line1" />
//         <Input label="City" autoComplete="address-level2" />
//         <Input label="Postal Code" autoComplete="postal-code" />
//     </div>
// );

// // ==================== CUSTOM STYLING ====================
// export const CustomStyles = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//         <Input
//             label="Purple Border"
//             style={{ borderColor: "purple", borderWidth: "2px" }}
//         />
//         <Input
//             label="Custom Background"
//             style={{ backgroundColor: "#f0f9ff" }}
//         />
//         <Input label="Large Border Radius" style={{ borderRadius: "20px" }} />
//     </div>
// );

// export const CustomClassName = () => (
//     <Input
//         label="Custom Class"
//         className="custom-input-class"
//         placeholder="Has custom CSS class"
//     />
// );

// // ==================== INTERACTIVE EXAMPLES ====================
// export const CharacterCounter = () => {
//     const [value, setValue] = useState("");
//     const maxLength = 100;

//     return (
//         <div>
//             <Input
//                 label="Bio"
//                 value={value}
//                 onChange={(e) => setValue(e.target.value)}
//                 maxLength={maxLength}
//                 helperText={`${value.length}/${maxLength} characters`}
//                 fullWidth
//             />
//         </div>
//     );
// };

// export const RealTimeValidation = () => {
//     const [password, setPassword] = useState("");

//     const hasMinLength = password.length >= 8;
//     const hasNumber = /\d/.test(password);
//     const hasSpecial = /[!@#$%^&*]/.test(password);

//     return (
//         <div>
//             <Input
//                 label="Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 fullWidth
//             />
//             <div style={{ marginTop: "12px", fontSize: "14px" }}>
//                 <div style={{ color: hasMinLength ? "green" : "red" }}>
//                     {hasMinLength ? "✓" : "✗"} At least 8 characters
//                 </div>
//                 <div style={{ color: hasNumber ? "green" : "red" }}>
//                     {hasNumber ? "✓" : "✗"} Contains a number
//                 </div>
//                 <div style={{ color: hasSpecial ? "green" : "red" }}>
//                     {hasSpecial ? "✓" : "✗"} Contains special character
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ==================== EDGE CASES ====================
// export const LongLabel = () => (
//     <Input
//         label="This is a very long label that might wrap to multiple lines depending on container width"
//         placeholder="Input with long label"
//     />
// );

// export const LongHelperText = () => (
//     <Input
//         label="Password"
//         helperText="Your password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character from the following set: !@#$%^&*()"
//     />
// );

// export const EmptyStates = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//         <Input label="No placeholder" />
//         <Input placeholder="No label" />
//         <Input />
//     </div>
// );

// // ==================== ALL STATES SHOWCASE ====================
// export const AllStates = () => (
//     <div
//         style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "24px",
//             maxWidth: "500px",
//         }}
//     >
//         <h3>Default</h3>
//         <Input label="Default Input" placeholder="Enter text..." />

//         <h3>With Value</h3>
//         <Input label="With Value" value="Some text" readOnly />

//         <h3>Error</h3>
//         <Input
//             label="Error State"
//             value="invalid"
//             error="This field has an error"
//         />

//         <h3>Success</h3>
//         <Input
//             label="Success State"
//             value="valid@email.com"
//             variant="success"
//         />

//         <h3>Disabled</h3>
//         <Input label="Disabled" value="Cannot edit" disabled />

//         <h3>Read Only</h3>
//         <Input label="Read Only" value="Read only value" readOnly />

//         <h3>Required</h3>
//         <Input label="Required Field" required />
//     </div>
// );
