class PlexusAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`PlexusAnimation: Canvas with id '${canvasId}' not found.`);
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.pulses = []; // Added for energy pulses
        this.config = {
            nodeColor: 'rgba(255, 255, 255, 0.5)',
            nodeRadius: 2.5,
            maxNodes: 60, // Adjusted from 70
            connectionDistance: 120,
            driftSpeed: 0.15, // Adjusted from 0.3
            pulseSpeed: 0.01, // Adjusted from 0.02 (for general node pulsing & energy pulse)
            pulseAmount: 0.25, // Adjusted from 0.4 (Factor of radius for general node pulsing)
            
            // New properties for knowledge graph enhancement
            hubNodeRatio: 0.05,
            hubNodeBaseRadius: 4,
            hubNodeColor: 'rgba(173, 216, 230, 0.9)', // Light blue
            hubNodePulseIntensity: 0.4, // Adjusted from 0.6 (Stronger pulse for hubs)
            energyPulseSize: 2.5, // Adjusted from 3
            energyPulseColor: 'rgba(255, 255, 255, 0.9)',
            connectionLineWidth: 0.75, // Thicker lines
            connectionLineColor: 'rgba(255, 255, 255, 0.3)' // Adjusted from 0.35 (More visible lines)
        };
        this.animationFrameId = null;
    }

    init() {
        if (!this.canvas) return;
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.generateNodes();
        this.animate();
        console.log("Plexus Animation Initialized");
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        // Could regenerate nodes on resize or adjust their positions
    }

    generateNodes() {
        this.nodes = [];
        const numNodes = Math.floor((this.canvas.width * this.canvas.height) / (1000000 / this.config.maxNodes) * this.config.maxNodes ); // Density based on area
        
        for (let i = 0; i < Math.min(this.config.maxNodes, numNodes) ; i++) {
            const isHub = Math.random() < this.config.hubNodeRatio;
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                baseRadius: isHub ? this.config.hubNodeBaseRadius : this.config.nodeRadius,
                color: isHub ? this.config.hubNodeColor : this.config.nodeColor,
                isHub: isHub,
                // originalRadius: this.config.nodeRadius, // Replaced by baseRadius
                opacity: Math.random() * 0.5 + 0.3, // Random initial opacity
                pulseAngle: Math.random() * Math.PI * 2, // For pulsing
                driftX: (Math.random() - 0.5) * this.config.driftSpeed,
                driftY: (Math.random() - 0.5) * this.config.driftSpeed,
            });
        }
    }

    updateNodes() {
        this.nodes.forEach(node => {
            // Pulse effect
            node.pulseAngle += this.config.pulseSpeed;
            const pulseIntensity = node.isHub ? this.config.hubNodePulseIntensity : this.config.pulseAmount;
            const pulseFactor = Math.sin(node.pulseAngle) * pulseIntensity;
            node.radius = node.baseRadius + pulseFactor * node.baseRadius;

            // Drift effect
            node.x += node.driftX;
            node.y += node.driftY;

            // Boundary check (wrap around)
            if (node.x < -node.radius) node.x = this.canvas.width + node.radius;
            if (node.x > this.canvas.width + node.radius) node.x = -node.radius;
            if (node.y < -node.radius) node.y = this.canvas.height + node.radius;
            if (node.y > this.canvas.height + node.radius) node.y = -node.radius;
        });
    }

    drawNodes() {
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, Math.max(0, node.radius), 0, Math.PI * 2);
            // Use node.color and modulate its alpha based on pulse and base opacity
            const baseAlpha = parseFloat(node.color.match(/,\s?(\d\.?\d*)\)/)[1]);
            const modulatedOpacity = node.opacity * ((Math.sin(node.pulseAngle) + 1) / 2 * 0.5 + 0.5);
            this.ctx.fillStyle = node.color.replace(/,\s?(\d\.?\d*)\)/, `, ${Math.min(1, baseAlpha * modulatedOpacity)})`);
            this.ctx.fill();
        });
    }

    drawLines() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const node1 = this.nodes[i];
                const node2 = this.nodes[j];
                const dx = node1.x - node2.x;
                const dy = node1.y - node2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    const opacity = 1 - (distance / this.config.connectionDistance);
                    this.ctx.beginPath();
                    this.ctx.moveTo(node1.x, node1.y);
                    this.ctx.lineTo(node2.x, node2.y);
                    this.ctx.strokeStyle = this.config.connectionLineColor.replace(/,\s?(\d\.?\d*)\)$/, `, ${opacity * parseFloat(this.config.connectionLineColor.match(/,\s?(\d\.?\d*)\)/)[1])})`);
                    this.ctx.lineWidth = this.config.connectionLineWidth;
                    this.ctx.stroke();

                    // Add a pulse if one isn't already running on this connection (simplified check)
                    // A more robust check might involve storing active connection pulses
                    if (Math.random() < 0.0025 && this.pulses.length < 30) { // Adjusted from 0.005 and 50
                        this.pulses.push({
                            startNode: node1,
                            endNode: node2,
                            progress: 0,
                            speed: this.config.pulseSpeed * 2, // Make energy pulses a bit faster
                            size: this.config.energyPulseSize,
                            color: this.config.energyPulseColor
                        });
                    }
                }
            }
        }
    }

    drawPulses() {
        for (let i = this.pulses.length - 1; i >= 0; i--) {
            const pulse = this.pulses[i];
            pulse.progress += pulse.speed;

            if (pulse.progress >= 1) {
                this.pulses.splice(i, 1);
            } else {
                const currentX = pulse.startNode.x + (pulse.endNode.x - pulse.startNode.x) * pulse.progress;
                const currentY = pulse.startNode.y + (pulse.endNode.y - pulse.startNode.y) * pulse.progress;
                
                this.ctx.beginPath();
                this.ctx.arc(currentX, currentY, pulse.size, 0, Math.PI * 2);
                this.ctx.fillStyle = pulse.color;
                this.ctx.fill();
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateNodes();
        this.drawNodes();
        this.drawLines();
        this.drawPulses(); // Added call
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    start() {
      if (!this.animationFrameId) {
        this.animate();
      }
    }

    stop() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
}

// Export or make available globally if needed later
// For now, it will be instantiated by AnimationManager 