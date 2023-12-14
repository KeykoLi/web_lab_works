document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.add_class');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name_input').value;
        const capacity = parseInt(document.getElementById('capacity_input').value);
        const attendance = parseInt(document.getElementById('attendance_input').value);
        const cost = parseInt(document.getElementById('cost_input').value);

        const complex = {
            name: name,
            capacity: capacity,
            attendance: attendance,
            cost: cost
        };

        try {
            const response = await fetch('/api/complex', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(complex),
            });

            if (response.ok) {
                console.log('Complex added successfully');
                document.getElementById('name_input').value = '';
                document.getElementById('capacity_input').value = '';
                document.getElementById('attendance_input').value = '';
                document.getElementById('cost_input').value = '';
                window.location.href = "index.html";
            } else {
                console.error('Error adding complex:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding complex:', error);
        }
    });
});
