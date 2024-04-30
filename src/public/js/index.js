const socket = io(); 

socket.on('productos', productos =>{
    const tbody = document.getElementById('productos-body');
    tbody.innerHTML = '';
    productos.forEach(producto => {
        const row = tbody.insertRow();

        row.innerHTML = `
        <td> ${producto.id}</td>
        <td> ${producto.title}</td>
        <td> ${producto.description}</td>
        <td> ${producto.price}</td>
        <td> ${producto.code}</td>
        <td> ${producto.stock}</td>
        <td> ${producto.category}</td>
        <td> ${producto.status ? 'Activo': 'Desactivo'}</td>
        <td> ${producto.thumbnails}</td>
        `;
    });
})

{/* <td> ${(producto.thumbnails.length > 0) ? producto.thumbnails[0] : 'No hay imagen' }</td> */}