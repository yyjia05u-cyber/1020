const totalAmount = 500;
const sizeThreshold = 5;
const decelerationFactor  = 1.05;
let drag = 0.01;
let mX = 0,	mY = 0;
let lastSaved = 0; 
let saveCooldown = 1000;
let bodies = [], menu;

function setup() {
	cnv = createCanvas(w = displayWidth, h = displayHeight);
	stroke(255, 6);
	background(0);
	createMenu();

	for (let i = 0; i < totalAmount; i++) {
		bodies.push(new Ball());
	}
	let saveBtn = createButton('Save');
  saveBtn.position(10, 10);
  saveBtn.size(60, 30);
  saveBtn.elt.addEventListener('click', saveSketch); 
}

function draw() {
	mX += 0.3 * (mouseX - mX);
	mY += 0.3 * (mouseY - mY);
	for (let i = 0; i < totalAmount; i++) bodies[i].render();

	// 控制選單可見度
	if (mouseX < 100) {
		menu.style('display', 'block');
	} else {
		menu.style('display', 'none');
	}
}

class Ball {
	constructor() {
		this.X = random(width);
		this.Y = random(height);
		this.w = random(1 / sizeThreshold, sizeThreshold);
		this.Xv = this.Yv = 0;
		this.pX = this.X;
		this.pY = this.Y;
	}

	render() {
		if (!mouseIsPressed) {
			this.Xv /= decelerationFactor;
			this.Yv /= decelerationFactor;
		}

		this.Xv += drag * (mX - this.X) * this.w;
		this.Yv += drag * (mY - this.Y) * this.w;

		this.X += this.Xv;
		this.Y += this.Yv;

		line(this.X, this.Y, this.pX, this.pY);
		this.pX = this.X;
		this.pY = this.Y;
	}
} 

function saveSketch(event) {
  event.preventDefault();
  let now = millis();
  if (now - lastSaved > saveCooldown) {
    let time = nf(minute(), 2) + '-' + nf(second(), 2);
    saveCanvas('drawing_' + time, 'png');
    lastSaved = now;
  }
}

function createMenu() {
	menu = createDiv('');
	menu.id('menu-container');
	menu.style('display', 'none'); // 初始隱藏

	let menuContent = `
		<ul>
			<li><a href="#">第一單元作品</a></li>
			<li><a href="#">第一單元講義</a></li>
			<li><a href="#">測驗系統</a></li>
			<li><a href="#">回到首頁</a></li>
		</ul>`;
	menu.html(menuContent);
}
