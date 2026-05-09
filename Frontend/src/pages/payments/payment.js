document.addEventListener('DOMContentLoaded', () => {
    // 1. Datos de ejemplo (Simulación de API)
    const pagos = [
        { cliente: "Juan Pérez", concepto: "Mensualidad Abril", monto: 150000, estado: "completado" },
        { cliente: "Ana García", concepto: "Mensualidad Abril", monto: 150000, estado: "completado" },
        { cliente: "Carlos Ruiz", concepto: "Matrícula 2024", monto: 85000, estado: "pendiente" },
        { cliente: "María López", concepto: "Mensualidad Abril", monto: 150000, estado: "completado" },
        { cliente: "Roberto Soler", concepto: "Recargo Mora", monto: 15000, estado: "mora" }
    ];

    const paymentList = document.querySelector('.payment-list');

    // 2. Función para renderizar los pagos
    const renderPagos = (data) => {
        paymentList.innerHTML = ''; // Limpiar lista

        data.forEach(pago => {
            const item = document.createElement('div');
            item.className = 'payment-item';
            
            // Formatear moneda (COP/Local)
            const montoFormateado = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                maximumFractionDigits: 0
            }).format(pago.monto);

            item.innerHTML = `
                <div>
                    <strong>${pago.cliente}</strong><br>
                    <small>${pago.concepto}</small>
                </div>
                <div class="amount">${montoFormateado}</div>
            `;

            // Efecto de entrada suave
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            paymentList.appendChild(item);

            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        });
    };

    // 3. Animación numérica para los valores principales (Stats)
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = (progress * (end - start)).toFixed(1);
            element.innerHTML = `$${value}M`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Inicializar
    renderPagos(pagos);

    // Animar el primer stat como ejemplo
    const statRecaudado = document.querySelector('.payment-summary .stat-value');
    if (statRecaudado) animateValue(statRecaudado, 0, 4.5, 1000);

    // 4. Bonus: Efecto de clic en los items
    paymentList.addEventListener('click', (e) => {
        const item = e.target.closest('.payment-item');
        if (item) {
            const nombre = item.querySelector('strong').innerText;
            console.log(`Abriendo detalles de: ${nombre}`);
            // Aquí podrías abrir un modal
        }
    });
});
