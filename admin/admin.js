const SUPABASE_URL = 'https://bkfvwjixmmdeojhmbpqk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrZnZ3aml4bW1kZW9qaG1icHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MzYxNTksImV4cCI6MjA5MzExMjE1OX0.8IkaI1hmiGmHDV4qecDlB5QIlz_60eDVYEb-L9RZBbE';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        detectSessionInUrl: false,
        flowType: 'implicit',
    }
});

// DOM
const authView = document.getElementById('authView');
const dashboardView = document.getElementById('dashboardView');
const authError = document.getElementById('authError');

// ─── AUTH ─────────────────────────────────────────────────────────────────────

// Listen for auth changes without page reloads
sb.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
        showDashboard();
    } else if (event === 'SIGNED_OUT') {
        showAuth();
    }
});

window.onload = async () => {
    const { data: { session } } = await sb.auth.getSession();
    if (session) showDashboard();
    else showAuth();
};

async function login() {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPass').value;
    if (!email || !password) { authError.innerText = 'Введите email и пароль'; return; }
    authError.innerText = 'Подождите...';
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) { authError.innerText = 'Ошибка: ' + error.message; }
    else { authError.innerText = ''; showDashboard(); }
}

async function logout() {
    await sb.auth.signOut();
    showAuth();
}

function showAuth() {
    authView.style.display = 'flex';
    dashboardView.style.display = 'none';
}

function showDashboard() {
    authView.style.display = 'none';
    dashboardView.style.display = 'flex';
    loadCourses();
    loadCategories();
    loadProducts();
}

// ─── TABS ─────────────────────────────────────────────────────────────────────

function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    event.target.classList.add('active');
}

// ─── MODAL HELPERS ────────────────────────────────────────────────────────────

function openModal(type, id = null) {
    if (type === 'course') openCourseModal(id);
    else if (type === 'category') openCategoryModal(id);
    else if (type === 'product') openProductModal(id);
}

function closeModal(type) {
    document.getElementById(type + 'Modal').style.display = 'none';
}

// ─── COURSES ─────────────────────────────────────────────────────────────────

let currentCourses = [];

async function loadCourses() {
    const tbody = document.getElementById('coursesTableBody');
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#666;">Загрузка...</td></tr>';
    const { data, error } = await sb.from('courses').select('*').order('sort_order', { ascending: true });
    if (error) { tbody.innerHTML = `<tr><td colspan="5" style="color:#ef4444;">Ошибка: ${error.message}</td></tr>`; return; }
    currentCourses = data;
    renderCoursesTable();
}

function renderCoursesTable() {
    const tbody = document.getElementById('coursesTableBody');
    if (!currentCourses.length) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#666;">Нет курсов. Добавьте первый.</td></tr>';
        return;
    }
    tbody.innerHTML = currentCourses.map(c => `
        <tr>
            <td><strong>${c.title}</strong><br><span style="color:#666;font-size:0.8rem;">${c.description || ''}</span></td>
            <td>${c.level || '—'}</td>
            <td>${c.age || '—'}</td>
            <td>${c.price || '—'}</td>
            <td>
                <button class="action-btn" onclick="openCourseModal('${c.id}')">Изменить</button>
                <button class="action-btn del-btn" onclick="deleteCourse('${c.id}')" style="margin-left:6px;">Удалить</button>
            </td>
        </tr>
    `).join('');
}

function openCourseModal(courseId = null) {
    const modal = document.getElementById('courseModal');
    const title = document.getElementById('courseModalTitle');
    if (courseId) {
        const c = currentCourses.find(x => x.id === courseId);
        document.getElementById('courseId').value = c.id;
        document.getElementById('courseTitle').value = c.title;
        document.getElementById('courseDesc').value = c.description || '';
        document.getElementById('courseLevel').value = c.level || '';
        document.getElementById('courseAge').value = c.age || '';
        document.getElementById('coursePrice').value = c.price || '';
        document.getElementById('courseMat').value = c.materials || '';
        title.innerText = 'Изменить курс';
    } else {
        ['courseId','courseTitle','courseDesc','courseLevel','courseAge','coursePrice','courseMat'].forEach(id => document.getElementById(id).value = '');
        title.innerText = 'Добавить курс';
    }
    modal.style.display = 'flex';
}

async function saveCourse() {
    const id = document.getElementById('courseId').value;
    const payload = {
        title:       document.getElementById('courseTitle').value.trim(),
        description: document.getElementById('courseDesc').value.trim(),
        level:       document.getElementById('courseLevel').value.trim(),
        age:         document.getElementById('courseAge').value.trim(),
        price:       document.getElementById('coursePrice').value.trim(),
        materials:   document.getElementById('courseMat').value.trim(),
    };
    if (!payload.title) { alert('Введите название курса'); return; }
    let error;
    if (id) {
        ({ error } = await sb.from('courses').update(payload).eq('id', id));
    } else {
        payload.sort_order = currentCourses.length + 1;
        ({ error } = await sb.from('courses').insert([payload]));
    }
    if (error) { alert('Ошибка: ' + error.message); return; }
    closeModal('course');
    loadCourses();
}

async function deleteCourse(id) {
    if (!confirm('Удалить этот курс?')) return;
    const { error } = await sb.from('courses').delete().eq('id', id);
    if (error) alert('Ошибка: ' + error.message);
    else loadCourses();
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

let currentCategories = [];

async function loadCategories() {
    const tbody = document.getElementById('categoriesTableBody');
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#666;">Загрузка...</td></tr>';
    const { data, error } = await sb.from('categories').select('*').order('name', { ascending: true });
    if (error) { tbody.innerHTML = `<tr><td colspan="3" style="color:#ef4444;">Ошибка: ${error.message}</td></tr>`; return; }
    currentCategories = data;
    renderCategoriesTable();
}

function renderCategoriesTable() {
    const tbody = document.getElementById('categoriesTableBody');
    if (!currentCategories.length) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#666;">Нет категорий. Добавьте первую.</td></tr>';
        return;
    }
    tbody.innerHTML = currentCategories.map(c => `
        <tr>
            <td style="color:#555;font-size:0.8rem;font-family:monospace;">${c.id.slice(0,8)}...</td>
            <td><strong>${c.name}</strong></td>
            <td>
                <button class="action-btn" onclick="openCategoryModal('${c.id}')">Изменить</button>
                <button class="action-btn del-btn" onclick="deleteCategory('${c.id}')" style="margin-left:6px;">Удалить</button>
            </td>
        </tr>
    `).join('');
}

function openCategoryModal(categoryId = null) {
    const modal = document.getElementById('categoryModal');
    const title = document.getElementById('categoryModalTitle');
    if (categoryId) {
        const c = currentCategories.find(x => x.id === categoryId);
        document.getElementById('categoryId').value = c.id;
        document.getElementById('categoryName').value = c.name;
        title.innerText = 'Изменить категорию';
    } else {
        document.getElementById('categoryId').value = '';
        document.getElementById('categoryName').value = '';
        title.innerText = 'Добавить категорию';
    }
    modal.style.display = 'flex';
}

async function saveCategory() {
    const id = document.getElementById('categoryId').value;
    const name = document.getElementById('categoryName').value.trim();
    if (!name) { alert('Введите название категории'); return; }
    let error;
    if (id) {
        ({ error } = await sb.from('categories').update({ name }).eq('id', id));
    } else {
        ({ error } = await sb.from('categories').insert([{ name }]));
    }
    if (error) { alert('Ошибка: ' + error.message); return; }
    closeModal('category');
    loadCategories();
    loadProducts(); // refresh category dropdown
}

async function deleteCategory(id) {
    if (!confirm('Удалить категорию? Все её товары тоже будут удалены.')) return;
    const { error } = await sb.from('categories').delete().eq('id', id);
    if (error) alert('Ошибка: ' + error.message);
    else { loadCategories(); loadProducts(); }
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

let currentProducts = [];

async function loadProducts() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#666;">Загрузка...</td></tr>';
    const { data, error } = await sb.from('products').select('*, categories(name)').order('name', { ascending: true });
    if (error) { tbody.innerHTML = `<tr><td colspan="5" style="color:#ef4444;">Ошибка: ${error.message}</td></tr>`; return; }
    currentProducts = data;
    renderProductsTable();
}

function renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!currentProducts.length) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#666;">Нет товаров. Добавьте первый.</td></tr>';
        return;
    }
    tbody.innerHTML = currentProducts.map(p => `
        <tr>
            <td><strong>${p.name}</strong><br><span style="color:#666;font-size:0.8rem;">${p.description || ''}</span></td>
            <td>${p.categories ? p.categories.name : '—'}</td>
            <td>${Number(p.price).toLocaleString()} UZS</td>
            <td>
                <span style="font-weight:600;color:${p.stock > 0 ? '#fff' : '#ef4444'};">${p.stock}</span>
                <button class="action-btn" onclick="changeStock('${p.id}', ${p.stock})" style="margin-left:8px;font-size:0.75rem;">+/−</button>
            </td>
            <td>
                <button class="action-btn" onclick="openProductModal('${p.id}')">Изменить</button>
                <button class="action-btn del-btn" onclick="deleteProduct('${p.id}')" style="margin-left:6px;">Удалить</button>
            </td>
        </tr>
    `).join('');
}

function openProductModal(productId = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('productModalTitle');

    // Reset image UI
    document.getElementById('productImageFile').value = '';
    document.getElementById('productExistingImage').value = '';
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('imagePreview').src = '';
    document.getElementById('imageUploadPlaceholder').style.display = 'flex';
    document.getElementById('removeImageBtn').style.display = 'none';

    // Populate category dropdown
    const select = document.getElementById('productCategory');
    select.innerHTML = currentCategories.length
        ? currentCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')
        : '<option value="">Сначала добавьте категорию</option>';

    if (productId) {
        const p = currentProducts.find(x => x.id === productId);
        document.getElementById('productId').value = p.id;
        document.getElementById('productName').value = p.name;
        document.getElementById('productDesc').value = p.description || '';
        document.getElementById('productPrice').value = p.price;
        document.getElementById('productStock').value = p.stock;
        select.value = p.category_id;
        title.innerText = 'Изменить товар';
        // Show existing image if any
        if (p.image_url) {
            document.getElementById('productExistingImage').value = p.image_url;
            const preview = document.getElementById('imagePreview');
            preview.src = p.image_url;
            preview.style.display = 'block';
            document.getElementById('imageUploadPlaceholder').style.display = 'none';
            document.getElementById('removeImageBtn').style.display = 'inline-block';
        }
    } else {
        ['productId','productName','productDesc','productPrice','productStock'].forEach(id => document.getElementById(id).value = '');
        title.innerText = 'Добавить товар';
    }
    modal.style.display = 'flex';
}

async function saveProduct() {
    const id = document.getElementById('productId').value;
    const fileInput = document.getElementById('productImageFile');
    const statusEl = document.getElementById('productSaveStatus');
    
    let image_url = document.getElementById('productExistingImage').value || null;

    // Upload new image if selected
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const ext = file.name.split('.').pop();
        const fileName = `product_${Date.now()}.${ext}`;
        
        statusEl.style.display = 'block';
        statusEl.textContent = 'Загрузка фото...';

        const { data: uploadData, error: uploadError } = await sb.storage
            .from('product-images')
            .upload(fileName, file, { upsert: true });

        if (uploadError) {
            statusEl.style.display = 'none';
            alert('Ошибка загрузки фото: ' + uploadError.message);
            return;
        }

        const { data: urlData } = sb.storage.from('product-images').getPublicUrl(fileName);
        image_url = urlData.publicUrl;
        statusEl.textContent = 'Фото загружено!';
    }

    const payload = {
        name:        document.getElementById('productName').value.trim(),
        description: document.getElementById('productDesc').value.trim(),
        category_id: document.getElementById('productCategory').value,
        price:       parseFloat(document.getElementById('productPrice').value) || 0,
        stock:       parseInt(document.getElementById('productStock').value) || 0,
        image_url:   image_url,
    };
    if (!payload.name) { alert('Введите название товара'); return; }
    if (!payload.category_id) { alert('Выберите категорию'); return; }
    
    let error;
    if (id) {
        ({ error } = await sb.from('products').update(payload).eq('id', id));
    } else {
        ({ error } = await sb.from('products').insert([payload]));
    }
    statusEl.style.display = 'none';
    if (error) { alert('Ошибка: ' + error.message); return; }
    closeModal('product');
    loadProducts();
}

async function deleteProduct(id) {
    if (!confirm('Удалить этот товар?')) return;
    const { error } = await sb.from('products').delete().eq('id', id);
    if (error) alert('Ошибка: ' + error.message);
    else loadProducts();
}

async function changeStock(id, currentStock) {
    const val = prompt('Новое количество в наличии:', currentStock);
    if (val === null) return;
    const stock = parseInt(val);
    if (isNaN(stock) || stock < 0) { alert('Введите корректное число'); return; }
    const { error } = await sb.from('products').update({ stock }).eq('id', id);
    if (error) alert('Ошибка: ' + error.message);
    else loadProducts();
}

// Image preview in modal
function previewProductImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById('imagePreview');
        preview.src = e.target.result;
        preview.style.display = 'block';
        document.getElementById('imageUploadPlaceholder').style.display = 'none';
        document.getElementById('removeImageBtn').style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
}

function removeProductImage() {
    document.getElementById('productImageFile').value = '';
    document.getElementById('productExistingImage').value = '';
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('imagePreview').src = '';
    document.getElementById('imageUploadPlaceholder').style.display = 'flex';
    document.getElementById('removeImageBtn').style.display = 'none';
}
