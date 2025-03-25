class StarField {
    constructor() {
        this.canvas = document.getElementById('stars-bg');
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.stars = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        
        this.init();
    }
    
    init() {
        // Set renderer size and pixel ratio
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        // Position camera
        this.camera.position.z = 50;
        
        // Create stars
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const sizes = [];
        
        for (let i = 0; i < 5000; i++) {
            vertices.push(
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000
            );
            sizes.push(Math.random() * 2);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
        
        const stars = new THREE.Points(geometry, material);
        this.scene.add(stars);
        this.stars.push(stars);
        
        // Event listeners
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Start animation
        this.animate();
    }
    
    onMouseMove(event) {
        this.mouseX = (event.clientX - this.windowHalfX) * 0.05;
        this.mouseY = (event.clientY - this.windowHalfY) * 0.05;
    }
    
    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Rotate stars based on mouse position
        this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.01;
        this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.01;
        this.camera.lookAt(this.scene.position);
        
        // Rotate stars
        this.stars.forEach(star => {
            star.rotation.y += 0.0005;
            star.rotation.x += 0.0002;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize star field when the page loads
window.addEventListener('load', () => {
    new StarField();
}); 