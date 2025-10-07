import { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";

export default {
    title: "UI/Core/Modal",
};

// ==================== BASIC USAGE ====================
export const Default = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <p>This is a basic modal with default settings.</p>
            </Modal>
        </>
    );
};

export const WithTitle = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Modal with Title
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Modal Title"
            >
                <p>This modal has a title in the header.</p>
            </Modal>
        </>
    );
};

export const WithFooter = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Modal with Footer
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Confirm Action"
                footer={
                    <>
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setIsOpen(false)}
                        >
                            Confirm
                        </Button>
                    </>
                }
            >
                <p>Are you sure you want to proceed with this action?</p>
            </Modal>
        </>
    );
};

// ==================== SIZES ====================
export const SmallSize = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Small Modal"
                size="sm"
            >
                <p>This is a small modal (400px max width).</p>
            </Modal>
        </>
    );
};

export const MediumSize = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Medium Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Medium Modal"
                size="md"
            >
                <p>
                    This is a medium modal (600px max width) - the default size.
                </p>
            </Modal>
        </>
    );
};

export const LargeSize = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Large Modal"
                size="lg"
            >
                <p>This is a large modal (800px max width).</p>
                <p>It provides more space for content.</p>
            </Modal>
        </>
    );
};

export const ExtraLargeSize = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Extra Large Modal
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Extra Large Modal"
                size="xl"
            >
                <p>This is an extra large modal (1200px max width).</p>
                <p>Perfect for complex forms or detailed content.</p>
            </Modal>
        </>
    );
};

export const FullSize = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Full Size Modal
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Full Size Modal"
                size="full"
            >
                <p>This modal takes up the full viewport.</p>
                <p>Great for immersive experiences or full-page forms.</p>
            </Modal>
        </>
    );
};

export const AllSizes = () => {
    const [openModal, setOpenModal] = useState<string | null>(null);

    return (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button onClick={() => setOpenModal("sm")}>Small</Button>
            <Button onClick={() => setOpenModal("md")}>Medium</Button>
            <Button onClick={() => setOpenModal("lg")}>Large</Button>
            <Button onClick={() => setOpenModal("xl")}>Extra Large</Button>
            <Button onClick={() => setOpenModal("full")}>Full</Button>

            <Modal
                isOpen={openModal === "sm"}
                onClose={() => setOpenModal(null)}
                title="Small Modal"
                size="sm"
            >
                <p>Small modal content (400px)</p>
            </Modal>

            <Modal
                isOpen={openModal === "md"}
                onClose={() => setOpenModal(null)}
                title="Medium Modal"
                size="md"
            >
                <p>Medium modal content (600px)</p>
            </Modal>

            <Modal
                isOpen={openModal === "lg"}
                onClose={() => setOpenModal(null)}
                title="Large Modal"
                size="lg"
            >
                <p>Large modal content (800px)</p>
            </Modal>

            <Modal
                isOpen={openModal === "xl"}
                onClose={() => setOpenModal(null)}
                title="Extra Large Modal"
                size="xl"
            >
                <p>Extra large modal content (1200px)</p>
            </Modal>

            <Modal
                isOpen={openModal === "full"}
                onClose={() => setOpenModal(null)}
                title="Full Size Modal"
                size="full"
            >
                <p>Full size modal content (100%)</p>
            </Modal>
        </div>
    );
};

// ==================== CLOSE BEHAVIORS ====================
export const CloseOnOverlay = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Close on Overlay Click"
                closeOnOverlayClick={true}
            >
                <p>Click the dark overlay behind this modal to close it.</p>
            </Modal>
        </>
    );
};

export const DisableCloseOnOverlay = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Cannot Close on Overlay"
                closeOnOverlayClick={false}
            >
                <p>Clicking the overlay won't close this modal.</p>
                <p>Use the close button or ESC key instead.</p>
            </Modal>
        </>
    );
};

export const CloseOnEsc = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Close on ESC"
                closeOnEsc={true}
            >
                <p>Press the ESC key to close this modal.</p>
            </Modal>
        </>
    );
};

export const DisableCloseOnEsc = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Cannot Close on ESC"
                closeOnEsc={false}
            >
                <p>Pressing ESC won't close this modal.</p>
                <p>Use the close button to dismiss.</p>
            </Modal>
        </>
    );
};

export const NoCloseButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="No Close Button"
                showCloseButton={false}
                footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
            >
                <p>This modal doesn't have a close button in the header.</p>
                <p>Use the button in the footer to close.</p>
            </Modal>
        </>
    );
};

export const ForceModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Force Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Forced Modal"
                closeOnOverlayClick={false}
                closeOnEsc={false}
                showCloseButton={false}
                footer={
                    <Button variant="primary" onClick={() => setIsOpen(false)}>
                        I Agree
                    </Button>
                }
            >
                <p>
                    This modal cannot be closed by clicking overlay or pressing
                    ESC.
                </p>
                <p>You must click the "I Agree" button to continue.</p>
            </Modal>
        </>
    );
};

// ==================== CONTENT EXAMPLES ====================
export const WithForm = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Form submitted!");
        setIsOpen(false);
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="User Registration"
                footer={
                    <>
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            form="registration-form"
                        >
                            Submit
                        </Button>
                    </>
                }
            >
                <form id="registration-form" onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                    >
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                required
                                style={{ width: "100%", padding: "8px" }}
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                required
                                style={{ width: "100%", padding: "8px" }}
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                required
                                style={{ width: "100%", padding: "8px" }}
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export const WithScrollableContent = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Scrollable Modal
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Terms and Conditions"
                footer={
                    <>
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                        >
                            Decline
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setIsOpen(false)}
                        >
                            Accept
                        </Button>
                    </>
                }
            >
                <div>
                    {Array.from({ length: 50 }, (_, i) => (
                        <p key={i}>
                            Section {i + 1}: This is a paragraph of terms and
                            conditions. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.
                        </p>
                    ))}
                </div>
            </Modal>
        </>
    );
};

export const WithLongContent = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Long Content Modal
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Article"
            >
                <article>
                    <h3>The Importance of Modal Design</h3>
                    <p>
                        Modal dialogs are an essential component of modern web
                        interfaces. They provide a focused way to present
                        information or gather input without navigating away from
                        the current page.
                    </p>
                    <h4>Best Practices</h4>
                    <ul>
                        <li>Always provide a clear way to close the modal</li>
                        <li>
                            Use modals sparingly to avoid disrupting user flow
                        </li>
                        <li>
                            Ensure modals are accessible with proper ARIA
                            attributes
                        </li>
                        <li>Make content scrollable when necessary</li>
                        <li>Prevent body scroll when modal is open</li>
                    </ul>
                    <h4>Accessibility Considerations</h4>
                    <p>
                        When designing modals, accessibility should be a top
                        priority. This includes keyboard navigation, screen
                        reader support, and focus management.
                    </p>
                    {Array.from({ length: 10 }, (_, i) => (
                        <p key={i}>
                            Additional paragraph {i + 1} demonstrating
                            scrollable content within the modal body. The modal
                            should handle long content gracefully with proper
                            overflow handling.
                        </p>
                    ))}
                </article>
            </Modal>
        </>
    );
};

export const ConfirmationDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        alert("Item deleted!");
        setIsOpen(false);
    };

    return (
        <>
            <Button variant="danger" onClick={() => setIsOpen(true)}>
                Delete Item
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Confirm Delete"
                size="sm"
                footer={
                    <>
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </>
                }
            >
                <p>Are you sure you want to delete this item?</p>
                <p style={{ color: "#ef4444", fontSize: "14px" }}>
                    This action cannot be undone.
                </p>
            </Modal>
        </>
    );
};

export const SuccessMessage = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Show Success</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="✓ Success"
                size="sm"
                footer={
                    <Button variant="primary" onClick={() => setIsOpen(false)}>
                        Continue
                    </Button>
                }
            >
                <p>Your changes have been saved successfully!</p>
            </Modal>
        </>
    );
};

export const ErrorMessage = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button variant="danger" onClick={() => setIsOpen(true)}>
                Show Error
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="⚠ Error"
                size="sm"
                footer={
                    <Button variant="primary" onClick={() => setIsOpen(false)}>
                        Try Again
                    </Button>
                }
            >
                <p style={{ color: "#ef4444" }}>
                    An error occurred while processing your request.
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                    Error code: 500
                </p>
            </Modal>
        </>
    );
};

// ==================== NESTED MODALS ====================
export const NestedModals = () => {
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setFirstOpen(true)}>Open First Modal</Button>

            <Modal
                isOpen={firstOpen}
                onClose={() => setFirstOpen(false)}
                title="First Modal"
            >
                <p>This is the first modal.</p>
                <Button onClick={() => setSecondOpen(true)}>
                    Open Second Modal
                </Button>
            </Modal>

            <Modal
                isOpen={secondOpen}
                onClose={() => setSecondOpen(false)}
                title="Second Modal"
            >
                <p>This is a nested modal on top of the first one.</p>
            </Modal>
        </>
    );
};

// ==================== INTERACTIVE EXAMPLES ====================
export const LoadingModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsOpen(false);
            alert("Operation completed!");
        }, 2000);
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Loading Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Processing"
                closeOnOverlayClick={!isLoading}
                closeOnEsc={!isLoading}
                footer={
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Submit"}
                    </Button>
                }
            >
                {isLoading ? (
                    <p>⏳ Please wait while we process your request...</p>
                ) : (
                    <p>Click submit to start processing.</p>
                )}
            </Modal>
        </>
    );
};

export const MultiStepModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);

    const handleClose = () => {
        setIsOpen(false);
        setStep(1);
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Multi-Step Modal
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={handleClose}
                title={`Step ${step} of 3`}
                footer={
                    <>
                        {step > 1 && (
                            <Button
                                variant="ghost"
                                onClick={() => setStep(step - 1)}
                            >
                                Previous
                            </Button>
                        )}
                        {step < 3 ? (
                            <Button
                                variant="primary"
                                onClick={() => setStep(step + 1)}
                            >
                                Next
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleClose}>
                                Finish
                            </Button>
                        )}
                    </>
                }
            >
                {step === 1 && <p>Step 1: Enter your basic information.</p>}
                {step === 2 && <p>Step 2: Configure your preferences.</p>}
                {step === 3 && <p>Step 3: Review and confirm your choices.</p>}
            </Modal>
        </>
    );
};

// ==================== CUSTOM STYLING ====================
export const CustomStyledModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Custom Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Custom Styled Modal"
                className="custom-modal-class"
            >
                <p>This modal has a custom className applied.</p>
                <p>You can style it with CSS as needed.</p>
            </Modal>
        </>
    );
};

// ==================== ALL FEATURES ====================
export const FullFeaturedModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Full Featured Modal
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Complete Modal Example"
                size="lg"
                closeOnOverlayClick={true}
                closeOnEsc={true}
                showCloseButton={true}
                footer={
                    <>
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => alert("Saved as draft!")}
                        >
                            Save Draft
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => alert("Published!")}
                        >
                            Publish
                        </Button>
                    </>
                }
            >
                <div>
                    <p>This modal demonstrates all available features:</p>
                    <ul>
                        <li>Title in header</li>
                        <li>Close button (X)</li>
                        <li>Scrollable content</li>
                        <li>Multiple action buttons in footer</li>
                        <li>Large size</li>
                        <li>Close on overlay click</li>
                        <li>Close on ESC key</li>
                    </ul>
                    <p>You can interact with all these features!</p>
                </div>
            </Modal>
        </>
    );
};
