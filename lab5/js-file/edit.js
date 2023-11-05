const nameEdit = document.getElementById("name_input_edit");
const capacityEdit = document.getElementById("capacity_input_edit");
const attendanceEdit = document.getElementById("attendance_input_edit");
const costEdit = document.getElementById("cost_input_edit");


const chooseModel = document.querySelector(".choose_complex");
chooseModel.addEventListener('submit', async function (e) {
    e.preventDefault();

    try {
        // Отримання ідентифікатора комплексу з URL
        const pathSegments = window.location.pathname.split('/');
        const complexId = pathSegments[pathSegments.length - 1];

        // Надіслання запиту до API методу getOne
        const response = await fetch(`http://localhost:5503/api/complex/${complexId}`);
        const complexData = await response.json();

        if (response.ok) {
            // Заповнення полів форми редагування даними з complexData
            nameEdit.value = complexData.name;
            capacityEdit.value = complexData.capacity;
            attendanceEdit.value = complexData.attendance;
            costEdit.value = complexData.cost;

            // Активувати форму редагування
            const editingForm = document.querySelector(".editing_form");
            editingForm.classList.add("active");
        } else {
            console.error('Error fetching complex for editing:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching complex for editing:', error);
    }
});

const finishEditing = document.querySelector(".editing_form");
finishEditing.addEventListener('submit', async function (e) {
    e.preventDefault();

    try {
        const response = await fetch(`/api/complex`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: NameComplexToEdit,
                capacity: parseInt(capacityEdit.value),
                attendance: parseInt(attendanceEdit.value),
                cost: parseInt(costEdit.value),
            }),
        });

        if (response.status === 200) {
            console.log('Complex edited successfully');
            // Опціонально: оновіть локальні дані, якщо потрібно
            const updatedComplexResponse = await fetch(`/api/complex/${NameComplexToEdit}`);
            if (updatedComplexResponse.ok) {
                const updatedComplex = await updatedComplexResponse.json();
                const index = complexs.findIndex(complex => complex.name === NameComplexToEdit);
                complexs[index] = updatedComplex;

                // localStorage.setItem('complexs', JSON.stringify(complexs));
            } else {
                const errorData = await updatedComplexResponse.json();
                console.error('Error fetching updated complex:', errorData);
            }
        } else {
            const errorData = await response.json();
            console.error('Error editing complex:', errorData);
        }
    } catch (error) {
        console.error('Error editing complex:', error);
    }
});
