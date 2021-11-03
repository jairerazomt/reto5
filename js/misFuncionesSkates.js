function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://140.238.191.42:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionSkate() {
    $.ajax({
        url:"http://140.238.191.42:8080/api/Audience/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaSkate(response);
        }

    });

}

function pintarRespuestaSkate(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>owner</td>";
        myTable+="<td>capacity</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].owner + "</td>";
        myTable+="<td>" + response[i].capacity + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonSkate2" onclick="borrar(' + response[i].id + ')">Borrar Auditorio!</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="cargarDatosSkate(' + response[i].id + ')">Editar Auditorio!</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="actualizar(' + response[i].id + ')">Actualizar Auditorio!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaSkate").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosSkate(id) {
    $.ajax({
        dataType: 'json',
        url:"http://140.238.191.42:8080/api/Audience/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#owner").val(item.owner);
            $("#capacity").val(item.capacity);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarSkate() {

    if($("#name2").val().length == 0 || $("#owner").val().length == 0 || $("#capacity").val().length == 0 || $("#description2").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#name2").val(),
                owner: $("#owner").val(),
                capacity: $("#capacity").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://140.238.191.42:8080/api/Audience/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#owner").val("");
                    $("#capacity").val("");
                    $("#description2").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://140.238.191.42:8080/api/Audience/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaSkate").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#name2").val().length == 0 || $("#owner").val().length == 0 || $("#capacity").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name2").val(),
            brand: $("#owner").val(),
            year: $("#capacity").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://140.238.191.42:8080/api/Audience/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaSkate").empty();
                listarSkate();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#owner").val("");
                $("#capacity").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
