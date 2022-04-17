function navtoggle() {
	let btn = document.getElementById('ib');
	let el = document.getElementsByClassName('button')
	btn.addEventListener('click', tog);

	let state = true;

	console.log(el)
	console.log(el[0])

	function tog() {

		if (state == true) {
			state = false
			console.log(state)
			el[0].style.visibility = 'visible';
			el[1].style.visibility = 'visible';
			el[2].style.visibility = 'visible';
			el[3].style.visibility = 'visible';
			el[4].style.visibility = 'visible';
			console.log("click")
			

		} else {
			state = true
			el[0].style.visibility = 'hidden';
			el[1].style.visibility = 'hidden';
			el[2].style.visibility = 'hidden';
			el[3].style.visibility = 'hidden';
			el[4].style.visibility = 'hidden';
			console.log("click")
		}
	}

}

export default function darkMode(scene, c1, c2) {
	let btn = document.getElementById('toggle');
	let ui = document.getElementById('ui');
	let state = true
	btn.addEventListener('click', log);

	function log() {

		if (state == true) {
			state = false
			scene.background = c1
			ui.classList.remove('dark-theme')
			ui.classList.toggle('light-theme');
			console.log('light mode toggled')
		} else {
			scene.background = c2
			ui.classList.remove('light-theme')
			ui.classList.toggle('dark-theme');
			state = true
			console.log('dark mode toggled')
		}
	}
}

navtoggle()