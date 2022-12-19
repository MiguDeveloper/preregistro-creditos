$(document).ready(function () {
  initAllowReject();
  initSurvey();
  initDatePicker();

  $.validator.addMethod(
    "emailfull",
    function (value, element) {
      return (
        this.optional(element) ||
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
      );
    },
    "Formato correo no valido"
  );

  $("#frmRegistro").validate({
    ignore: "",
    rules: initRules(),
    messages: initMessages(),
    submitHandler: function (form, event) {
      event.preventDefault();
      const data = $("#frmRegistro").serializeArray();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "¡Te registraste con éxito!",
        text: "En un plazo de 48 horas te enviaremos un correo de confirmación con los requisitos del programa.",
        confirmButtonText: "Listo!",
        customClass: {
          confirmButton: "btn-submit btn-submit--confirm",
        },
        buttonsStyling: false,
      });
    },
    invalidHandler: function (event, validator) {
      console.log("fomulario invalido: campos requeridos");
      event.preventDefault();
    },
  });

  $(".showmodalTerms").click(function (evt) {
    Swal.fire({
      title: TITULO_TERMINOS,
      html: TERMINOSCONDICIONES,
      confirmButtonText: "Aceptar",
      customClass: {
        title: "title--color-secondary",
        confirmButton: "btn-submit btn-submit--confirm",
      },
      buttonsStyling: false,
    });
  });

  $(".showModalPolitics").click(function (evt) {
    Swal.fire({
      title: TITULO_POLITICAS,
      html: POLITICASDATOS,
      confirmButtonText: "Aceptar",
      customClass: {
        title: "title--color-secondary",
        confirmButton: "btn-submit btn-submit--confirm",
      },
      buttonsStyling: false,
    });
  });
});

const initSurvey = () => {
  $("#showOtro").hide();
  $("#comoSeEntero").change(function () {
    const MEDIO = this.value;
    if ("otros" === MEDIO) {
      $("#showOtro").show("slow");
    } else {
      $("#otros").val("");
      $("#showOtro").hide("slow");
    }
  });
};
const initAllowReject = () => {
  $("#show-allow").hide();
  $("#reject").hide();
};

const initDatePicker = () => {
  $("#fNacimiento").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "-45:+0",
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ],
    dayNamesMin: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    firstDay: 1,
    gotoCurrent: true,
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Deciembre",
    ],
    onSelect: function () {
      let date = $(this).datepicker("getDate");
      const dateFormatISO = new Date(date).toISOString();
      const arrayDate = dateFormatISO.split("T")[0].split("-");
      const currentDate = new Date();
      let edad = currentDate.getFullYear() - +arrayDate[0];
      const month = currentDate.getMonth() + 1 - arrayDate[1];

      if (month < 0 || (month === 0 && currentDate.getDate() < arrayDate[2])) {
        --edad;
      }
      console.log(edad);

      if (edad < 18 || edad > 25) {
        $("#show-allow").hide();
        $("#reject").show("slow");
        return;
      }

      $("#reject").hide("slow");
      $("#show-allow").show("slow");
    },
  });
};

const initRules = () => {
  const RULES = {
    nombres: {
      required: true,
    },
    dni: {
      required: true,
      number: true,
      minlength: 8,
      maxlength: 8,
    },
    fNacimiento: {
      required: true,
    },
    email: {
      required: true,
      emailfull: true,
    },
    tieneCreditoAnterior: {
      required: true,
    },
    nivelAcademico: {
      required: true,
    },
    institucionEducativa: {
      required: true,
    },
    carrera: {
      required: true,
    },
    cicloAContinuar: {
      required: true,
    },
    comoSeEntero: {
      required: true,
    },
    otros: {
      required: {
        depends: function () {
          if ($("#comoSeEntero").val() === "otros") {
            return true;
          }
          return false;
        },
      },
    },
    terminos: {
      required: true,
    },
  };

  return RULES;
};

const initMessages = () => {
  const CAMPO_REQUERIDO = "Campo requerido";
  const MESSAGES = {
    nombres: {
      required: CAMPO_REQUERIDO,
    },
    dni: {
      required: CAMPO_REQUERIDO,
      number: "Solo digitos númericos",
      minlength: "Mínimo 8 digitos",
      maxlength: "Máximo 8 digitos",
    },
    fNacimiento: {
      required: CAMPO_REQUERIDO,
    },
    email: {
      required: CAMPO_REQUERIDO,
      email: "Formato correo invalido",
    },
    tieneCreditoAnterior: {
      required: CAMPO_REQUERIDO,
    },
    nivelAcademico: {
      required: CAMPO_REQUERIDO,
    },
    institucionEducativa: {
      required: CAMPO_REQUERIDO,
    },
    carrera: {
      required: CAMPO_REQUERIDO,
    },
    cicloAContinuar: {
      required: CAMPO_REQUERIDO,
    },
    comoSeEntero: {
      required: CAMPO_REQUERIDO,
    },
    otros: {
      required: CAMPO_REQUERIDO,
    },
    terminos: {
      required: "Requerido",
    },
  };

  return MESSAGES;
};
