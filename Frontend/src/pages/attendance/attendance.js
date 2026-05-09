document.addEventListener('DOMContentLoaded', () => {
    // 1. Poner la fecha actual automáticamente
    const dateInput = document.querySelector('input[type="date"]');
    const hoy = new Date().toISOString().split('T')[0];
    dateInput.value = hoy;

    // 2. Lógica para marcar/desmarcar asistencia
    const studentCards = document.querySelectorAll('.student-check');

    studentCards.forEach(card => {
        card.addEventListener('click', () => {
            const toggle = card.querySelector('.toggle-status');
            toggle.classList.toggle('active');
            
            // Efecto visual opcional: feedback de clic
            card.style.transform = 'scale(0.98)';
            setTimeout(() => card.style.transform = 'scale(1)', 100);
        });
    });

    // 3. Simular guardado de datos
    const saveBtn = document.querySelector('.btn-primary');
    saveBtn.addEventListener('click', () => {
        const presentes = document.querySelectorAll('.toggle-status.active').length;
        const total = studentCards.length;
        
        alert(`✅ Registro guardado con éxito.\nAsistentes: ${presentes} de ${total}`);
    });
});
