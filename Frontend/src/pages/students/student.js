document.addEventListener('DOMContentLoaded', () => {
    const btnNuevo = document.querySelector('.btn-primary');
    const tableBody = document.querySelector('tbody');

    // 1. Lógica para "Nuevo Estudiante"
    btnNuevo.addEventListener('click', () => {
        const nombre = prompt("Nombre del estudiante:");
        if (nombre) {
            const grado = prompt("Grado:");
            const acudiente = prompt("Nombre del acudiente:");
            
            agregarFila({
                nombre,
                grado,
                acudiente,
                estado: 'Pendiente',
                claseEstado: 'status-pendiente'
            });
        }
    });

    // 2. Función para insertar nueva fila en la tabla
    function agregarFila(data) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${data.nombre}</td>
            <td>${data.grado}</td>
            <td>${data.acudiente}</td>
            <td><span class="status-badge ${data.claseEstado}">${data.estado}</span></td>
            <td><button class="btn-outline btn-edit">Editar</button></td>
        `;
        tableBody.appendChild(tr);
        
        // Asignar evento al nuevo botón creado
        tr.querySelector('.btn-edit').addEventListener('click', () => editarEstudiante(tr));
    }

    // 3. Lógica para "Editar" (Delegación de eventos o asignación directa)
    function editarEstudiante(fila) {
        const nombreActual = fila.cells[0].innerText;
        const nuevoNombre = prompt("Editar nombre:", nombreActual);
        
        if (nuevoNombre !== null) {
            fila.cells[0].innerText = nuevoNombre;
            // Aquí podrías agregar lógica para cambiar grado o estado también
            alert("Estudiante actualizado correctamente");
        }
    }

    //Asignar evento a los botones "Editar" que ya vienen en el HTML
    document.querySelectorAll('.btn-outline').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fila = e.target.closest('tr');
            editarEstudiante(fila);
        });
    });
});
