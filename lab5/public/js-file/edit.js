document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const complexId = urlParams.get('id');

    try {
        const response = await fetch(`/api/complex/${complexId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch complex. Status: ${response.status}`);
        }

        const complex = await response.json();

        // Заповнення форми даними комплексу
        document.getElementById('name_input_edit').value = complex.name;
        document.getElementById('capacity_input_edit').value = complex.capacity;
        document.getElementById('attendance_input_edit').value = complex.attendance;
        document.getElementById('cost_input_edit').value = complex.cost;

    } catch (error) {
        console.error('Error fetching complex:', error.message);
    }
});

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const complexId = urlParams.get('id');

    const editForm = document.querySelector('.editing_form');

    if (editForm) {
        editForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const updatedComplex = {
                name: document.getElementById('name_input_edit').value,
                capacity: document.getElementById('capacity_input_edit').value,
                attendance: document.getElementById('attendance_input_edit').value,
                cost: document.getElementById('cost_input_edit').value
            };

            try {
                const response = await fetch(`/api/complex/${complexId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedComplex)
                });

                if (response.ok) {
                    console.log('Complex updated successfully.');
                    window.location.href = '/';
                } else {
                    throw new Error(`Failed to update complex. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error updating complex:', error.message);
            }
        });
    } else {
        console.error('Form with class "editing_form" not found');
    }
});