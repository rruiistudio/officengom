export default function handleText() {

	var canvas = document.getElementById("2Dscene");
	console.log(canvas)
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext('2d');
	console.log(ctx)

	let particleArray = [];


	// handle mouse 
	const mouse = {
		x: null,
		y: null,
		radius: 80
	}

	window.addEventListener('mousemove', function (event) {
		mouse.x = event.x;
		mouse.y = event.y;
	})

	// add font

	ctx.fillStyle = 'black';
	ctx.font = '40px Verdana';
	ctx.textAlign = 'center';
	console.log(window.innerWidth/2)

    let trueWidth = window.innerWidth
    let trueHeight = window.innerHeight

	let centerX = trueWidth/2
	let centerY = trueHeight/2
	ctx.fillText('ngom', centerX - 100, centerY - 100);
	ctx.fillText('ngom', centerX + 100, centerY + 100);

    window.addEventListener('resize', textResize, false);

    console.log(trueHeight)

    
	
	const textCoordinates = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight);

	class Particle {
		constructor(x, y) {
			this.x = x;
			this.y = y;
			this.size = 1;
			this.baseX = this.x;
			this.baseY = this.y;
			this.density = (Math.random() * 10) + 1;

		}

		draw() {
			ctx.fillStyle = 'rgba(0,0,0,0.39)';
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		}

		update() {
			let dx = mouse.x - this.x;
			let dy = mouse.y - this.y;
			let distance = Math.sqrt(dx * dx + dy * dy);
			let forceDirectionX = dx / distance;
			let forceDirectionY = dy / distance;
			let maxDistance = mouse.radius;
			let force = (maxDistance - distance) / maxDistance;

			let directionX = forceDirectionX * force * this.density;
			let directionY = forceDirectionY * force * this.density;


			if (distance < mouse.radius) {
				this.x -= directionX;
				this.y -= directionY;
			} else {
				if (this.x !== this.baseX) {
					let dx = this.x - this.baseX;
					this.x -= dx / 10;
				}

				if (this.y !== this.baseY) {
					let dy = this.y - this.baseY;
					this.y -= dy / 10;
				}
			}
		}
	}

	function init() {
		particleArray = [];
		for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
			for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
				if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
					let positionX = x;
					let positionY = y;
					particleArray.push(new Particle(positionX, positionY))
				}
			}
		}

		console.log(particleArray);

		const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

		particleArray = everyNth(particleArray, 6)

	
	}

	init();
	console.log(particleArray);

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < particleArray.length; i++) {
			particleArray[i].draw();
			particleArray[i].update();
		}

		connect();
		requestAnimationFrame(animate);
	}

	animate();

	function connect() {

		for (let a = 0; a < particleArray.length; a++) {
			for (let b = a; b < particleArray.length; b++) {
				let dx = particleArray[a].x - particleArray[b].x;
				let dy = particleArray[a].y - particleArray[b].y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < 10) {
					ctx.strokeStyle = 'rgba(0,0,0,0.39)';
					ctx.lineWidth = 0.2;
					ctx.beginPath();
					ctx.moveTo(particleArray[a].x, particleArray[a].y);
					ctx.lineTo(particleArray[b].x, particleArray[b].y);
					ctx.stroke();
				}
			}
		}
	}

	
// to do: dynamically resize the darn text
	function textResize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.textAlign = 'center';

        trueWidth = window.innerWidth;
        trueHeight = window.innerHeight;

        console.log('resize function ran!')
	}

}

