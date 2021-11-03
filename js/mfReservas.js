function autoInicioRelacionCliente(){
    $.ajax({
        //url: "http://localhost:8080/api...",
        url:"http://140.238.191.42:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            }); 
        }
    })
}

//Capturar DATA para GET AUDIENCE TO RESERVATION
function autoInicioAudience(){
    $.ajax({
        //url: "http://localhost:8080/api...",
        url:"http://140.238.191.42:8080/api/Audience/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-audience");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            }); 
        }
    })
}

//Manejador POST RESERVATION
function agregarReservation() {
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos son Obligatorios")
    }else{  
        let elemento = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            audience:{id: +$("#select-audience").val()},
            client:{idClient: +$("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            //url: "http://localhost:8080/api...",
            url:"http://140.238.191.42:8080/api/Reservation/save",
            data: dataToSend,
            datatype: "json",

            success: function (response) {
                console.log(response);
                //Limpiar Campos
                $("#resultado5").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

                //Listar TABLE
                alert("Se ha guardado Correctamente!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se guardo Correctamente!")
            }
        });
    }
}

//Manejador GET RESERVATION
function listarReservation(){
    $.ajax({
        //url: "http://localhost:8080/api...",
        url:"http://140.238.191.42:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaReservation(response);
        }
    });
}

function pintarRespuestaReservation(response){
    let myTable="<table>";
        myTable+="<tr>";
            myTable+="<td>Fecha Inicio</td>";
            myTable+="<td>fecha Devolucion</td>";
            myTable+="<td>Estado</td>";
            myTable+="<td>Auditorio</td>";
            myTable+="<td>Cliente</td>";
            "</tr>";
    for(i=0;i<response.length;i++){
        myTable+="<tr>";
            myTable+="<td>"+response[i].startDate+"</td>";
            myTable+="<td>"+response[i].devolutionDate+"</td>";
            myTable+="<td>"+response[i].status+"</td>";
            myTable+="<td>"+response[i].audience.name+"</td>";
            myTable+="<td>"+response[i].client.name+"</td>";
            myTable+='<td><button  onclick="borrarReservation(' + response[i].idReservation + ')">Borrar Reserva!</button></td>';
            myTable+='<td><button  onclick="cargarDatosReservation(' + response[i].idReservation + ')">Editar Reserva!</button></td>';
            myTable+='<td><button  onclick="actualizarReservation(' + response[i].idReservation + ')">Actualizar Reserva!</button></td>';
            myTable+="</tr>";
    }
    myTable+="</table>";
        $("#miListaReservation").html(myTable);
}

//Manejador DELETE RESERVATION
function borrarReservation(idElemento) {
    let elemento = {
        id: idElemento
    }
    let dataToSend = JSON.stringify(elemento);
    $.ajax({
        dataType: 'json',
        data: dataToSend,
        //url: "http://localhost:8080/api/..." + idElemento,
        url:"http://140.238.191.42:8080/api/Reservation/"+idElemento,
        type: 'DELETE',
        contentType: "application/JSON",

        success: function (response) {
            console.log(response);
                $("#miListaReservation").empty();

            alert("se ha Eliminado Correctamente!")
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se Elimino Correctamente!")
        }
    });
}

//Capturar DATA para UPDATE RESERVATION
function cargarDatosReservation(id) {
    $.ajax({
        dataType: 'json',
        //url: "http://localhost:8080/api..." + id,
        url:"http://140.238.191.42:8080/api/Reservation/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;
                $("#startDate").val(item.startDate);
                $("#devolutionDate").val(item.devolutionDate);
                $("#status").val(item.status);

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

//Manejador PUT RESERVATION
function actualizarReservation(idElemento) {
    
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            idReservation: idElemento,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            audience:{id: +$("#select-audience").val()},
            client:{idClient: +$("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            //url: "http://localhost:8080/api...",
            url:"http://140.238.191.42:8080/api/Reservation/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaReservation").empty();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado5").empty();

                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}