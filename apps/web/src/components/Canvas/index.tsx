import { Box, Button, useTheme } from "@blade/ui";
import { useCallback, useEffect, useRef, useState } from "react";

const Canvas = () => {
    const { theme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => {
        setZoom((prev) => prev + 0.2);
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(0.01, prev - 0.2));
    };

    const drawGrid = useCallback(
        (context: CanvasRenderingContext2D, width: number, height: number) => {
            const gridSize = 20;
            // Calculate visible area in canvas space
            const startX = Math.floor(-width / 2 / zoom) * gridSize;
            const startY = Math.floor(-height / 2 / zoom) * gridSize;
            const endX = Math.ceil(width / 2 / zoom) * gridSize + gridSize;
            const endY = Math.ceil(height / 2 / zoom) * gridSize + gridSize;

            context.strokeStyle = theme.colors.muted;
            context.lineWidth = 1 / zoom; // Keep lines thin when zoomed

            // Draw vertical lines
            for (let x = startX; x <= endX; x += gridSize) {
                context.beginPath();
                context.moveTo(x, startY);
                context.lineTo(x, endY);
                context.stroke();
            }

            // Draw horizontal lines
            for (let y = startY; y <= endY; y += gridSize) {
                context.beginPath();
                context.moveTo(startX, y);
                context.lineTo(endX, y);
                context.stroke();
            }
        },
        [theme.colors.muted, zoom],
    );

    const render = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const { width, height } = canvas;

        // Clear canvas
        context.clearRect(0, 0, width, height);
        context.save();

        // Apply center-based zoom
        context.translate(width / 2, height / 2);
        context.scale(zoom, zoom);
        context.translate(-width / 2, -height / 2);

        // Draw grid
        drawGrid(context, width, height);

        context.restore();
    }, [drawGrid, zoom]);

    // Handle canvas sizing with DPR
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = container.getBoundingClientRect();

            // Set actual canvas size (accounting for DPR)
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Set display size
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            // Scale context to account for DPR
            const context = canvas.getContext("2d");
            if (context) {
                context.scale(dpr, dpr);
            }

            render();
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        return () => window.removeEventListener("resize", resizeCanvas);
    }, [render]);

    // Re-render when zoom changes
    useEffect(() => {
        render();
    }, [render]);

    return (
        <Box
            ref={containerRef}
            w="100%"
            h="100%"
            style={{
                position: "relative",
                boxShadow: theme.shadows.lg,
            }}
        >
            <Button
                variant="primary"
                onClick={handleZoomIn}
                style={{
                    position: "absolute",
                    zIndex: 999,
                }}
            >
                Zoom In
            </Button>
            <Button
                variant="secondary"
                onClick={handleZoomOut}
                style={{
                    position: "absolute",
                    zIndex: 999,
                    left: "100px",
                }}
            >
                Zoom Out
            </Button>
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "block",
                }}
            />
        </Box>
    );
};

export default Canvas;
