const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");

const countButton = document.getElementById('count');
const totalAttendanceElement = document.getElementById('totalAttendance');

countButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/complex');
        const complexs = await response.json();

        let total_attendance = 0;
        for (let i of complexs) {
            total_attendance += i.attendance;
        }
        totalAttendanceElement.textContent = total_attendance;
    } catch (error) {
        console.error('Error fetching complexes:', error);
    }
});


document.addEventListener('DOMContentLoaded', async function () {
    let complexs = await fetch('/api/complex').then(response => response.json()) || [];

    function renderComplexs() {
        let selectors = document.querySelectorAll(".complex_container");
        selectors.forEach((selector) => {
            let name_div = selector.querySelector(".name");
            let capacity_div = selector.querySelector(".capacity");
            let attendance_div = selector.querySelector(".attendance");
            let cost_div = selector.querySelector(".cost");
            name_div.innerHTML = null;
            capacity_div.innerHTML = null;
            attendance_div.innerHTML = null;
            cost_div.innerHTML = null;
        });
        displayObjectsOnPage(complexs);
    }

    function sortComplexsCapacity() {
        complexs.sort(function (a, b) {
            return b.capacity - a.capacity;
        });
        renderComplexs();
    }

    const CapacityDes = document.getElementById("capacity__des");
    CapacityDes.addEventListener("click", sortComplexsCapacity);

    const CapacityAsc = document.getElementById("capacity__asc");
    CapacityAsc.addEventListener("click", async function () {
        complexs = await fetch('/api/complex').then(response => response.json()) || [];
        complexs.sort(function (a, b) {
            return a.capacity - b.capacity;
        });
        renderComplexs();
    });
    renderComplexs();
});


async function findComplex() {
    const find_input = document.getElementById("find_input");
    const findButton = document.getElementById("find_button");
    const result = document.getElementById("result");

    findButton.addEventListener("click", async function (event) {
        event.preventDefault();
        result.classList.toggle('active');
        const findName = find_input.value.toLowerCase();

        try {
            const response = await fetch(`/api/complex/${findName}`);
            const foundComplex = await response.json();

            if (foundComplex) {
                result.innerHTML = `
                    Name: ${foundComplex.name}<br>
                    Capacity: ${foundComplex.capacity}<br>
                    Attendance: ${foundComplex.attendance}<br>
                    Cost: ${foundComplex.cost}<br>
                `;
            } else {
                result.innerHTML = 'Complex not found. Check the spelling of the name.';
            }
        } catch (error) {
            console.error('Error finding complex:', error);
        }
    });
}
findComplex();


function displayObjectsOnPage(objects) {
    const allComplexs = document.querySelector(".complexs_selec");
    allComplexs.innerHTML = '';
    objects.forEach((object) => {
        const displayElement = document.createElement("div");
        displayElement.classList.add("complex_container");
        displayElement.innerHTML = `
            <div class="name">
                <p>Name: ${object.name}</p>
            </div>
            <div class="capacity">
                <p>Capacity: ${object.capacity}</p>
            </div>
            <div class="attendance">
                <p>Attendance: ${object.attendance}</p>
            </div>
            <div class="cost">
                <p>Cost: ${object.cost}</p>
            </div>
            <div class="buttons">
                <button class="delete_button">Delete</button>
            </div>
        `;
        displayElement.addEventListener('click', () => {
            displayElement.classList.toggle('selected');
        });

        const deleteButton = displayElement.querySelector('.delete_button');
        deleteButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`/api/complex/${object.id}`, { method: 'DELETE' });
                if (response.ok) {
                    const index = objects.findIndex(obj => obj === object);
                    objects.splice(index, 1);
                    displayObjectsOnPage(objects);
                } else {
                    console.error('Error deleting complex:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting complex:', error);
            }
        });

        allComplexs.appendChild(displayElement);
    });
}


document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/api/complex');
        const complexs = await response.json() || [];

        displayObjectsOnPage(complexs);
    } catch (error) {
        console.error('Error fetching complexes:', error);
    }
});


async function deleteObject(id) {
    const res = await fetch(`http://localhost:5503/api/complex/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await res.json();
    console.log(data);

    if(data) {
        document.getElementById(`complex${id}`).remove();
    }
}