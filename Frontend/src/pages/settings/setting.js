document.addEventListener('DOMContentLoaded', () => {
    const btnGuardar = document.querySelector('.btn-primary');
    const textareas = document.querySelectorAll('textarea');

    // 1. Efecto visual al enfocar textareas
    textareas.forEach(area => {
        area.addEventListener('focus', () => {
            area.style.borderColor = 'var(--accent-color)';
            area.style.boxShadow = '0 0 0 3px rgba(var(--accent-rgb, 59, 130, 246), 0.1)';
        });

        area.addEventListener('blur', () => {
            area.style.borderColor = 'var(--border-color)';
            area.style.boxShadow = 'none';
        });

        // 2. Validación simple de etiquetas en tiempo real
        area.addEventListener('input', () => {
            const regex = /\{([^}]+)\}/g;
            const matches = area.value.match(regex);
            // Podrías resaltar las llaves si quisieras, pero por ahora solo validamos contenido
            if (area.value.length > 500) {
                area.style.color = 'var(--danger-color)';
            } else {
                area.style.color = 'white';
            }
        });
    });

    // 3. Manejo del evento Guardar
    btnGuardar.addEventListener('click', () => {
        // Cambiar estado del botón
        const originalText = btnGuardar.innerText;
        btnGuardar.innerText = 'Guardando...';
        btnGuardar.disabled = true;

        // Simulación de guardado en base de datos o LocalStorage
        const configuracion = Array.from(textareas).map(t => t.value);
        localStorage.setItem('adminbot_templates', JSON.stringify(configuracion));

        setTimeout(() => {
            // Revertir botón con éxito
            btnGuardar.innerText = '¡Guardado con éxito! ✅';
            btnGuardar.style.background = '#10b981'; // Color verde éxito

            // Feedback visual al usuario
            mostrarNotificacion('Configuración actualizada correctamente');

            setTimeout(() => {
                btnGuardar.innerText = originalText;
                btnGuardar.disabled = false;
                btnGuardar.style.background = ''; // Vuelve al original de CSS
            }, 2000);
        }, 1000);
    });

    // 4. Función de notificación "Toast"
    const mostrarNotificacion = (msj) => {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            transition: all 0.3s ease;
            transform: translateY(100px);
        `;
        toast.innerText = msj;
        document.body.appendChild(toast);

        // Animación de entrada
        setTimeout(() => toast.style.transform = 'translateY(0)', 100);

        // Desvanecer y quitar
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };
});
