document.addEventListener('DOMContentLoaded', () => {
    // 1. Simulación de base de datos de alertas
    const alertas = [
        { id: 1, tipo: 'urgente', titulo: 'Pago vencido: Juan Pérez', tiempo: 'Hace 5 min', icono: '⚠️' },
        { id: 2, tipo: 'info', titulo: 'Nuevo estudiante registrado', tiempo: 'Hace 20 min', icono: '👤' },
        { id: 3, tipo: 'warning', titulo: 'Baja asistencia: 4to Grado', tiempo: 'Hace 1 hora', icono: '📊' },
        { id: 4, tipo: 'success', titulo: 'Reporte mensual generado', tiempo: 'Hace 3 horas', icono: '📄' }
    ];

    const alertsContainer = document.querySelector('.content-body'); // O el contenedor donde quieras las alertas

    // 2. Función para crear el HTML de la alerta
    const crearAlerta = (alerta) => {
        const card = document.createElement('div');
        // Agregamos la clase 'alert-card' y la prioridad como clase extra
        card.className = `alert-card ${alerta.tipo}`;
        card.setAttribute('data-id', alerta.id);

        card.innerHTML = `
            <div class="alert-icon">${alerta.icono}</div>
            <div class="alert-info">
                <strong>${alerta.titulo}</strong>
                <span class="alert-time">${alerta.tiempo}</span>
            </div>
            <button class="btn-close-alert" style="background:transparent; border:none; cursor:pointer; opacity:0.3;">✕</button>
        `;

        // 3. Efecto de eliminación (Marcar como leída)
        const closeBtn = card.querySelector('.btn-close-alert');
        closeBtn.addEventListener('click', () => {
            card.style.transform = 'translateX(100px)';
            card.style.opacity = '0';
            setTimeout(() => card.remove(), 300);
        });

        return card;
    };

    // 4. Renderizado con animación de cascada
    const renderAlertas = () => {
        // Opcional: Limpiar contenedor si es necesario
        // alertsContainer.innerHTML = '<h3>Alertas Recientes</h3>'; 

        alertas.forEach((alerta, index) => {
            const nuevaAlerta = crearAlerta(alerta);
            
            // Retraso para efecto de entrada escalonada
            nuevaAlerta.style.opacity = '0';
            nuevaAlerta.style.transform = 'translateY(20px)';
            
            alertsContainer.appendChild(nuevaAlerta);

            setTimeout(() => {
                nuevaAlerta.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                nuevaAlerta.style.opacity = '1';
                nuevaAlerta.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };

    renderAlertas();

    // 5. Simulación de "Push Notification"
    // Agrega una alerta nueva después de 5 segundos
    setTimeout(() => {
        const nuevaNotificacion = { 
            id: 99, 
            tipo: 'urgente', 
            titulo: 'Intento de acceso no autorizado', 
            tiempo: 'Ahora mismo', 
            icono: '🔒' 
        };
        const el = crearAlerta(nuevaNotificacion);
        alertsContainer.prepend(el); // Aparece al principio
    }, 5000);
});
