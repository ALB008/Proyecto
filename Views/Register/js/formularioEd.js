const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	texto1: /^[[a-zA-ZÀ-ÿ\s0-9\ \_\-]{5,50}$/, // Letras, numeros, guion y guion_bajo
	texto2: /^[a-zA-ZÀ-ÿ\s0-9\#\ \-]{1,70}$/, // Letras y espacios, pueden llevar acentos.
	tel: /^[0-9\+]{7,15}$/, // 1 a 2 digitos.
	
}

const campos = {
	nombre: false,
	ciud: false,
	direc: false,
	tel: false
	
}

const ValidarFormulario = (e) => {
	switch(e.target.name) {
		case "nombre":
			ValidarCmpo(expresiones.texto1, e.target, 'nombre');
		break;		
		
		case "ciud":
			ValidarCmpo(expresiones.texto1, e.target, 'ciud');		
		break;

		case "direc":
			ValidarCmpo(expresiones.texto2, e.target, 'direc');
		break;

		case "tel":
			ValidarCmpo(expresiones.tel, e.target, 'tel');
		break;

	}
}

const ValidarCmpo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campo[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', ValidarFormulario);
	input.addEventListener('blur', ValidarFormulario);
});

formulario.addEventListener('submit', (e) =>{
	e.preventDefault();

	if( campos.nombre && campos.ciud && campos.direc && campos.tel){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() =>{
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		},5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else{
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
		setTimeout(() =>{
			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		},5000);
	}
});
