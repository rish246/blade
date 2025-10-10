import type { Story } from "@ladle/react";
import { useState } from "react";
import Tooltip, { TooltipProps } from "../Tooltip";
import { ThemeProvider as ThemeContextProvider } from "../../theme/theme-provider";

export default {
    title: "UI/Utilities/Tooltip",
};

// Wrapper component for all stories
const StoryWrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeContextProvider>{children}</ThemeContextProvider>
);

// Basic Stories
export const Default: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip content="This is a helpful tooltip">
                <button>Hover me</button>
            </Tooltip>
        </div>
    </StoryWrapper>
);

export const WithCustomDelay: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip content="I appear after 1 second" delayMs={1000}>
                <button>Hover me (slow)</button>
            </Tooltip>
            <span style={{ marginLeft: "20px" }} />
            <Tooltip content="I appear instantly" delayMs={0}>
                <button>Hover me (instant)</button>
            </Tooltip>
        </div>
    </StoryWrapper>
);

// Trigger Variations
export const HoverTrigger: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip content="Appears on hover" trigger="hover">
                <button>Hover me</button>
            </Tooltip>
        </div>
    </StoryWrapper>
);

export const FocusTrigger: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip content="Appears on focus (Tab to me)" trigger="focus">
                <button>Focus me</button>
            </Tooltip>
        </div>
    </StoryWrapper>
);

export const ClickTrigger: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip content="Appears on click" trigger="click">
                <button>Click me</button>
            </Tooltip>
        </div>
    </StoryWrapper>
);

export const MultipleTriggers: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip
                content="Appears on hover or focus"
                trigger={["hover", "focus"]}
            >
                <button>Hover or Tab to me</button>
            </Tooltip>
            <span style={{ marginLeft: "20px" }} />
            <Tooltip
                content="Appears on all triggers"
                trigger={["hover", "focus", "click"]}
            >
                <button>Hover, Focus, or Click</button>
            </Tooltip>
        </div>
    </StoryWrapper>
);

// Disabled States
export const DisabledButton: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip content="You need admin rights to delete users">
                <button disabled>Delete User</button>
            </Tooltip>
        </div>
    </StoryWrapper>
);

// export const DisabledTooltip: Story<TooltipProps> = () => (
//     <StoryWrapper>
//         <div style={{ padding: "100px", textAlign: "center" }}>
//             <Tooltip content="This tooltip is disabled" disabled={true}>
//                 <button>Hover me (no tooltip)</button>
//             </Tooltip>
//         </div>
//     </StoryWrapper>
// );

// Accessibility
export const WithAriaLive: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip
                content="This will be announced politely"
                liveRegion="polite"
            >
                <button>Hover for announcement</button>
            </Tooltip>
            <span style={{ marginLeft: "20px" }} />
            <Tooltip
                content="This will be announced assertively"
                liveRegion="assertive"
            >
                <button>Hover for urgent announcement</button>
            </Tooltip>
        </div>
    </StoryWrapper>
);

export const KeyboardAccessible: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <p style={{ marginBottom: "20px" }}>Tab through these elements:</p>
            <input placeholder="Before" style={{ marginRight: "20px" }} />
            <Tooltip
                content="Press Escape to close"
                trigger={["hover", "focus"]}
            >
                <button>Interactive Button</button>
            </Tooltip>
            <input placeholder="After" style={{ marginLeft: "20px" }} />
        </div>
    </StoryWrapper>
);

// Portal
export const WithPortal: Story<TooltipProps> = () => {
    return (
        <StoryWrapper>
            <div id="tooltip-portal" />
            <div
                style={{
                    padding: "100px",
                    textAlign: "center",
                    overflow: "hidden",
                    border: "2px dashed #ccc",
                    position: "relative",
                }}
            >
                <p style={{ marginBottom: "20px" }}>
                    Without portal (clipped by overflow):
                </p>
                {/* <Tooltip content="I might get clipped" portal={false}>
                    <button>Hover me</button>
                </Tooltip> */}

                <p style={{ marginTop: "40px", marginBottom: "20px" }}>
                    With portal (not clipped):
                </p>
                <Tooltip
                    content="I render in a portal!"
                    portal="#tooltip-portal"
                >
                    <button>Hover me</button>
                </Tooltip>
            </div>
        </StoryWrapper>
    );
};

export const PortalToBody: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip content="I render directly to document.body">
                <button>Hover me</button>
            </Tooltip>
        </div>
    </StoryWrapper>
);

// Styling
export const CustomStyling: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip
                content="Custom styled tooltip"
                contentClassName="custom-tooltip-style"
                className="custom-wrapper-style"
            >
                <button>Hover me</button>
            </Tooltip>
            <style>{`
                .custom-tooltip-style {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 12px 16px;
                    border-radius: 8px;
                    font-weight: 500;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    </StoryWrapper>
);

export const LongContent: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip content="This is a much longer tooltip that contains multiple words and could wrap to multiple lines depending on the width constraints applied to it.">
                <button>Hover for long tooltip</button>
            </Tooltip>
        </div>
    </StoryWrapper>
);

// Interactive Examples
export const ConditionalTooltip: Story<TooltipProps> = () => {
    const [isValid, setIsValid] = useState(false);

    return (
        <StoryWrapper>
            <div style={{ padding: "100px", textAlign: "center" }}>
                <div style={{ marginBottom: "20px" }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isValid}
                            onChange={(e) => setIsValid(e.target.checked)}
                        />{" "}
                        Enable form submission
                    </label>
                </div>
                <Tooltip
                    content={
                        isValid
                            ? "Submit the form"
                            : "Please enable form submission first"
                    }
                >
                    <button disabled={!isValid}>Submit</button>
                </Tooltip>
            </div>
        </StoryWrapper>
    );
};

export const DynamicContent: Story<TooltipProps> = () => {
    const [count, setCount] = useState(0);

    return (
        <StoryWrapper>
            <div style={{ padding: "100px", textAlign: "center" }}>
                <Tooltip content={`Clicked ${count} times`}>
                    <button onClick={() => setCount(count + 1)}>
                        Click me
                    </button>
                </Tooltip>
            </div>
        </StoryWrapper>
    );
};

// Complex Layouts
export const MultipleTooltips: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                }}
            >
                <Tooltip content="Save your work">
                    <button>💾 Save</button>
                </Tooltip>
                <Tooltip content="Open a file">
                    <button>📂 Open</button>
                </Tooltip>
                <Tooltip content="Print document">
                    <button>🖨️ Print</button>
                </Tooltip>
                <Tooltip content="Share with others">
                    <button>📤 Share</button>
                </Tooltip>
                <Tooltip content="Settings and preferences">
                    <button>⚙️ Settings</button>
                </Tooltip>
            </div>
        </div>
    </StoryWrapper>
);

export const TooltipGrid: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "40px",
                    maxWidth: "600px",
                    margin: "0 auto",
                }}
            >
                {[
                    { label: "Top Left", content: "Tooltip 1" },
                    { label: "Top Center", content: "Tooltip 2" },
                    { label: "Top Right", content: "Tooltip 3" },
                    { label: "Middle Left", content: "Tooltip 4" },
                    { label: "Center", content: "Tooltip 5" },
                    { label: "Middle Right", content: "Tooltip 6" },
                    { label: "Bottom Left", content: "Tooltip 7" },
                    { label: "Bottom Center", content: "Tooltip 8" },
                    { label: "Bottom Right", content: "Tooltip 9" },
                ].map((item, index) => (
                    <Tooltip key={index} content={item.content}>
                        <button style={{ width: "100%" }}>{item.label}</button>
                    </Tooltip>
                ))}
            </div>
        </div>
    </StoryWrapper>
);

// Edge Cases
export const TooltipOnInput: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip content="Enter your email address" trigger="focus">
                <input
                    type="email"
                    placeholder="Email"
                    style={{ padding: "8px" }}
                />
            </Tooltip>
        </div>
    </StoryWrapper>
);

export const TooltipOnLink: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip content="Opens in new tab">
                <a
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Example.com
                </a>
            </Tooltip>
        </div>
    </StoryWrapper>
);

export const TooltipOnIcon: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", textAlign: "center" }}>
            <Tooltip content="More information">
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "#0066cc",
                        color: "white",
                        cursor: "help",
                        fontSize: "14px",
                        fontWeight: "bold",
                    }}
                >
                    ?
                </span>
            </Tooltip>
        </div>
    </StoryWrapper>
);

// Real-world Examples
export const FormWithTooltips: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px", maxWidth: "400px", margin: "0 auto" }}>
            <h3 style={{ marginBottom: "20px" }}>User Registration</h3>
            <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>
                    Username{" "}
                    <Tooltip
                        content="Must be 3-20 characters, alphanumeric only"
                        trigger="focus"
                    >
                        <span
                            style={{
                                display: "inline-flex",
                                width: "16px",
                                height: "16px",
                                borderRadius: "50%",
                                background: "#666",
                                color: "white",
                                fontSize: "10px",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "help",
                            }}
                        >
                            i
                        </span>
                    </Tooltip>
                </label>
                <input
                    type="text"
                    placeholder="johndoe"
                    style={{ width: "100%", padding: "8px" }}
                />
            </div>
            <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>
                    Password{" "}
                    <Tooltip
                        content="Must contain at least 8 characters, including uppercase, lowercase, and numbers"
                        trigger="focus"
                    >
                        <span
                            style={{
                                display: "inline-flex",
                                width: "16px",
                                height: "16px",
                                borderRadius: "50%",
                                background: "#666",
                                color: "white",
                                fontSize: "10px",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "help",
                            }}
                        >
                            i
                        </span>
                    </Tooltip>
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    style={{ width: "100%", padding: "8px" }}
                />
            </div>
            <Tooltip content="Click to create your account">
                <button
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#0066cc",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Register
                </button>
            </Tooltip>
        </div>
    </StoryWrapper>
);

export const Toolbar: Story<TooltipProps> = () => (
    <StoryWrapper>
        <div style={{ padding: "100px" }}>
            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    padding: "8px",
                    background: "#f5f5f5",
                    borderRadius: "8px",
                    width: "fit-content",
                    margin: "0 auto",
                }}
            >
                <Tooltip content="Bold (Ctrl+B)">
                    <button
                        style={{
                            padding: "8px 12px",
                            border: "1px solid #ddd",
                            background: "white",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        <strong>B</strong>
                    </button>
                </Tooltip>
                <Tooltip content="Italic (Ctrl+I)">
                    <button
                        style={{
                            padding: "8px 12px",
                            border: "1px solid #ddd",
                            background: "white",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        <em>I</em>
                    </button>
                </Tooltip>
                <Tooltip content="Underline (Ctrl+U)">
                    <button
                        style={{
                            padding: "8px 12px",
                            border: "1px solid #ddd",
                            background: "white",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        <u>U</u>
                    </button>
                </Tooltip>
                <div
                    style={{
                        width: "1px",
                        background: "#ddd",
                        margin: "0 4px",
                    }}
                />
                <Tooltip content="Align Left">
                    <button
                        style={{
                            padding: "8px 12px",
                            border: "1px solid #ddd",
                            background: "white",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        ≡
                    </button>
                </Tooltip>
                <Tooltip content="Align Center">
                    <button
                        style={{
                            padding: "8px 12px",
                            border: "1px solid #ddd",
                            background: "white",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        ≡
                    </button>
                </Tooltip>
                <Tooltip content="Align Right">
                    <button
                        style={{
                            padding: "8px 12px",
                            border: "1px solid #ddd",
                            background: "white",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        ≡
                    </button>
                </Tooltip>
            </div>
        </div>
    </StoryWrapper>
);

Default.storyName = "Default";
