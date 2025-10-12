import type { Story } from "@ladle/react";
import Popover, { PopOverProps } from "../components/Popover";
import { ThemeProvider as ThemeContextProvider } from "../theme/theme-provider";

export default {
    title: "UI/Utilities/Popover",
};

// Wrapper component for all stories
const StoryWrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeContextProvider>{children}</ThemeContextProvider>
);

// Basic Placement Stories
export const PlacementTop: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This popover appears above the trigger button"
                    title="Top Placement"
                    description="Positioned at the top"
                    placement="top"
                    showArrow={true}
                    animated={true}
                >
                    <button>Click for Top Popover</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const PlacementBottom: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This popover appears below the trigger button"
                    title="Bottom Placement"
                    description="Positioned at the bottom"
                    placement="bottom"
                    showArrow={true}
                    animated={true}
                >
                    <button>Click for Bottom Popover</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const PlacementLeft: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This popover appears to the left of the trigger button"
                    title="Left Placement"
                    description="Positioned on the left"
                    placement="left"
                    showArrow={true}
                    animated={true}
                >
                    <button>Click for Left Popover</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const PlacementRight: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This popover appears to the right of the trigger button"
                    title="Right Placement"
                    description="Positioned on the right"
                    placement="right"
                    showArrow={true}
                    animated={true}
                >
                    <button>Click for Right Popover</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

// Arrow Variants
export const WithArrow: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This popover has an arrow pointing to the trigger"
                    title="With Arrow"
                    placement="top"
                    showArrow={true}
                    animated={true}
                >
                    <button>With Arrow</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const WithoutArrow: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This popover does not have an arrow"
                    title="Without Arrow"
                    placement="top"
                    showArrow={false}
                    animated={true}
                >
                    <button>Without Arrow</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

// Backdrop Variants
export const WithBackdrop: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This popover has a backdrop overlay"
                    title="With Backdrop"
                    description="Click the backdrop to close"
                    placement="top"
                    showBackdrop={true}
                    animated={true}
                >
                    <button>Open with Backdrop</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const WithoutBackdrop: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This popover has no backdrop overlay"
                    title="Without Backdrop"
                    placement="top"
                    showBackdrop={false}
                    animated={true}
                >
                    <button>Open without Backdrop</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

// Animation Variants
export const Animated: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This popover animates when opening and closing"
                    title="Animated"
                    placement="top"
                    animated={true}
                    animationDuration={300}
                >
                    <button>Animated Popover</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const NotAnimated: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This popover appears instantly without animation"
                    title="Not Animated"
                    placement="top"
                    animated={false}
                >
                    <button>No Animation</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

// Content Variants
export const WithTitleAndDescription: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This is the main content of the popover"
                    title="Popover Title"
                    description="This is a helpful description"
                    placement="top"
                    animated={true}
                >
                    <button>Full Content</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const OnlyContent: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="Just the content, no title or description"
                    placement="top"
                    animated={true}
                >
                    <button>Content Only</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const RichContent: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content={
                        <div style={{ padding: "10px" }}>
                            <h4 style={{ margin: "0 0 10px 0" }}>
                                Rich Content
                            </h4>
                            <p style={{ margin: "0 0 10px 0" }}>
                                You can add any React component as content
                            </p>
                            <ul style={{ margin: "0", paddingLeft: "20px" }}>
                                <li>Lists</li>
                                <li>Forms</li>
                                <li>Images</li>
                                <li>Anything else!</li>
                            </ul>
                        </div>
                    }
                    placement="top"
                    animated={true}
                >
                    <button>Rich Content</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const WithForm: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content={
                        <form style={{ padding: "10px" }}>
                            <div style={{ marginBottom: "10px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "5px",
                                    }}
                                >
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    style={{ width: "100%", padding: "5px" }}
                                />
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "5px",
                                    }}
                                >
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    style={{ width: "100%", padding: "5px" }}
                                />
                            </div>
                            <button type="submit" style={{ width: "100%" }}>
                                Submit
                            </button>
                        </form>
                    }
                    title="Quick Form"
                    placement="top"
                    animated={true}
                    width="300px"
                >
                    <button>Open Form</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

// Behavior Variants
export const CloseOnEscape: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="Press ESC to close this popover"
                    title="Close on Escape"
                    placement="top"
                    closeOnEscape={true}
                    animated={true}
                >
                    <button>Press ESC to Close</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const NoCloseOnEscape: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="ESC key won't close this popover. Use the close button."
                    title="ESC Disabled"
                    placement="top"
                    closeOnEscape={false}
                    animated={true}
                >
                    <button>ESC Won't Work</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const CloseOnClickOutside: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <p>Click outside the popover to close it</p>
                <Popover
                    content="Click anywhere outside to close"
                    title="Click Outside"
                    placement="top"
                    closeOnClickOutside={true}
                    animated={true}
                >
                    <button>Click Outside to Close</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const NoCloseOnClickOutside: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <p>Clicking outside won't close this popover</p>
                <Popover
                    content="Clicking outside won't close this. Use the close button."
                    title="Click Outside Disabled"
                    placement="top"
                    closeOnClickOutside={false}
                    animated={true}
                >
                    <button>Must Use Close Button</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

// Size Variants
export const SmallSize: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="Small sized popover"
                    title="Small"
                    placement="top"
                    size="sm"
                    animated={true}
                >
                    <button>Small Popover</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const MediumSize: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="Medium sized popover (default)"
                    title="Medium"
                    placement="top"
                    size="md"
                    animated={true}
                >
                    <button>Medium Popover</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const LargeSize: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="Large sized popover with more space for content"
                    title="Large"
                    placement="top"
                    size="lg"
                    animated={true}
                >
                    <button>Large Popover</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

export const CustomWidth: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This popover has a custom width of 400px"
                    title="Custom Width"
                    placement="top"
                    width="400px"
                    animated={true}
                >
                    <button>Custom Width (400px)</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

// State Variants
export const Disabled: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="You shouldn't see this"
                    title="Disabled"
                    placement="top"
                    disabled={true}
                    animated={true}
                >
                    <button>Disabled Popover (Won't Open)</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

// Custom Close Button
export const CustomCloseButton: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content="This popover has a custom close button label"
                    title="Custom Close"
                    placement="top"
                    closeButtonLabel="Done"
                    animated={true}
                >
                    <button>Custom Close Button</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

// Multiple Popovers
export const MultiplePopovers: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div
                style={{
                    padding: "200px",
                    textAlign: "center",
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                }}
            >
                <Popover
                    content="First popover"
                    title="Popover 1"
                    placement="top"
                    animated={true}
                >
                    <button>Open Popover 1</button>
                </Popover>
                <Popover
                    content="Second popover"
                    title="Popover 2"
                    placement="bottom"
                    animated={true}
                >
                    <button>Open Popover 2</button>
                </Popover>
                <Popover
                    content="Third popover"
                    title="Popover 3"
                    placement="left"
                    animated={true}
                >
                    <button>Open Popover 3</button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};

// Complex Example
export const CompleteExample: Story<PopOverProps> = () => {
    return (
        <StoryWrapper>
            <div style={{ padding: "200px", textAlign: "center" }}>
                <Popover
                    content={
                        <div style={{ padding: "10px", maxWidth: "300px" }}>
                            <p>This is a complete example showcasing:</p>
                            <ul
                                style={{
                                    textAlign: "left",
                                    paddingLeft: "20px",
                                }}
                            >
                                <li>Custom title and description</li>
                                <li>Rich content with formatting</li>
                                <li>Arrow indicator</li>
                                <li>Backdrop overlay</li>
                                <li>Smooth animations</li>
                                <li>Keyboard accessibility</li>
                            </ul>
                            <p
                                style={{
                                    marginTop: "10px",
                                    fontSize: "12px",
                                    color: "#666",
                                }}
                            >
                                Try pressing ESC or clicking outside to close
                            </p>
                        </div>
                    }
                    title="Feature-Rich Popover"
                    description="All features enabled"
                    placement="top"
                    showArrow={true}
                    showBackdrop={true}
                    closeOnEscape={true}
                    closeOnClickOutside={true}
                    animated={true}
                    animationDuration={250}
                    width="350px"
                >
                    <button style={{ padding: "12px 24px", fontSize: "16px" }}>
                        Open Complete Example
                    </button>
                </Popover>
            </div>
        </StoryWrapper>
    );
};
