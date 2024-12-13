<script>
    import { onMount } from "svelte";

    let lines = 1;
    let columns = 1;
    let size = 'small';
    let canvasWidth = 370;
    let canvasHeight = 200;
    let cabinetsPositions = [];
    let canvas;
    let mousePosition = {x: 0, y: 0};
    let fromCabinet = null;
    let toCabinet = null; 
    let isDrawing = false;
    let lineSegments = [];


    const getBaseCabinetDimensions = (size) => {
        switch (size) {
            case 'small':
                return { width: 50, height: 30 };
            case 'medium':
                return { width: 100, height: 60 };
            case 'large':
                return { width: 150, height: 90 };
            default:
                return { width: 50, height: 30 };
        }
    };

    const getAdjustedCabinetDimensions = (canvasWidth, canvasHeight, columns, lines, size) => {
        const padding = 10;
        const baseDimensions = getBaseCabinetDimensions(size);

        const maxWidth = (canvasWidth - padding * (columns - 1)) / columns;
        const maxHeight = (canvasHeight - padding * (lines - 1)) / lines;

        const widthRatio = maxWidth / baseDimensions.width;
        const heightRatio = maxHeight / baseDimensions.height;
        const scaleRatio = Math.min(widthRatio, heightRatio, 1);

        return {
            width: baseDimensions.width * scaleRatio,
            height: baseDimensions.height * scaleRatio,
        };
    };
    
    const drawLine = (start, end) => {
        const ctx = canvas.getContext("2d");

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y, end);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    };

    const drawCabinets = () => {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        cabinetsPositions = [];  

        const { width, height } = getAdjustedCabinetDimensions(canvasWidth, canvasHeight, columns, lines, size);

        for (let col = 0; col < columns; col++) {
            for (let row = 0; row < lines; row++) {
                const x = col * (width + 10);
                const y = row * (height + 10);

                const coordonnees = `(${col + 1},${row + 1})`;
                const id = row * columns + col + 1;

                ctx.strokeRect(x, y, width, height);
                cabinetsPositions.push({ x: x + width / 2, y: y + height / 2, id, coordonnees });

                ctx.fillStyle = "black";
                ctx.font = "12px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(coordonnees, x + width / 2, y + height / 2);
            }
        }
    }; 

    const getHoveredCabinet = (x, y) => {
        return cabinetsPositions.find(cabinet => {
            const distance = Math.sqrt(Math.pow(x - cabinet.x, 2) + Math.pow(y - cabinet.y, 2));
            const threshold = 30;
            return distance <= threshold;
        });
    };

    const handleMouseMove = (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        mousePosition = { x: mouseX, y: mouseY };

        if (isDrawing && fromCabinet) {
            drawCabinets();
            drawPreviousLines();
            drawLine(fromCabinet, mousePosition);
        } else {
            const hoveredCabinet = getHoveredCabinet(mouseX, mouseY);
            drawCabinets();
            drawPreviousLines();

            if (hoveredCabinet) {
                drawLine(hoveredCabinet, mousePosition);
            }
        }
    };

    const handleClick = (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const clickedCabinet = getHoveredCabinet(mouseX, mouseY);

        if (!isDrawing && clickedCabinet) {
            fromCabinet = clickedCabinet;
            isDrawing = true;
        } else if (isDrawing) {
            isDrawing = false;
            toCabinet = { x: mouseX, y: mouseY };
            lineSegments.push({ from: fromCabinet, to: toCabinet });

            drawCabinets();
            drawPreviousLines();
            drawLine(fromCabinet, toCabinet); 

            fromCabinet = toCabinet; 
            isDrawing = true; 
        }
    };

    const drawPreviousLines = () => {
        lineSegments.forEach((segment) => {
            drawLine(segment.from, segment.to);
        });
    };

    onMount(() => {
        drawCabinets();
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("click", handleClick);
    });
    
</script>

<section>
    <div>
        <h2>Configuration des cabinets</h2>
        <form>
            <label>Lines</label>
            <select bind:value={lines} on:change={drawCabinets}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <label>Columns</label>
            <select bind:value={columns} on:change={drawCabinets}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <label>Size</label>
            <select bind:value={size} on:change={drawCabinets}>
                <option value="small">Small (50x30)</option>
                <option value="medium">Medium (100x60)</option>
                <option value="large">Large (150x90)</option>
            </select>
        </form>
    </div>

    <!-- Canvas for drawing cabinets -->
    <canvas bind:this={canvas} width={canvasWidth} height={canvasHeight} style="border:1px solid black; margin-top: 20px;"></canvas>
</section>

<style>
</style>

