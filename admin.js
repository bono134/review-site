const ADMIN_PW = 'dodok';

export function isAdmin() {
    return sessionStorage.getItem('isAdmin') === '1';
}

function injectModal() {
    if (document.getElementById('admin_pw_modal')) return;
    const modal = document.createElement('dialog');
    modal.id = 'admin_pw_modal';
    modal.className = 'admin_pw_modal';
    modal.innerHTML = `
        <div class="admin_pw_inner">
            <div class="admin_pw_title">관리자 인증</div>
            <input type="password" id="admin_pw_input" class="admin_pw_input" placeholder="비밀번호를 입력하세요" autocomplete="current-password">
            <p class="admin_pw_error" id="admin_pw_error"></p>
            <div class="admin_pw_actions">
                <button class="cancel_btn" id="admin_pw_cancel">취소</button>
                <button class="submit_btn" id="admin_pw_confirm">확인</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function injectLogoutModal() {
    if (document.getElementById('admin_logout_modal')) return;
    const modal = document.createElement('dialog');
    modal.id = 'admin_logout_modal';
    modal.className = 'admin_pw_modal';
    modal.innerHTML = `
        <div class="admin_pw_inner">
            <div class="admin_pw_title">관리자 모드 종료</div>
            <p class="admin_pw_desc">관리자 모드를 종료하시겠습니까?</p>
            <div class="admin_pw_actions">
                <button class="cancel_btn" id="admin_logout_cancel">취소</button>
                <button class="delete_btn" id="admin_logout_confirm">종료</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

export function setupAdminTrigger() {
    if (isAdmin()) document.body.classList.add('is_admin');

    injectModal();
    injectLogoutModal();

    const pwModal     = document.getElementById('admin_pw_modal');
    const pwInput     = document.getElementById('admin_pw_input');
    const pwError     = document.getElementById('admin_pw_error');
    const logoutModal = document.getElementById('admin_logout_modal');

    function showError(msg) {
        pwError.textContent = msg;
        pwInput.classList.add('admin_pw_shake');
        pwInput.addEventListener('animationend', () => pwInput.classList.remove('admin_pw_shake'), { once: true });
    }

    function tryLogin() {
        if (pwInput.value === ADMIN_PW) {
            sessionStorage.setItem('isAdmin', '1');
            document.body.classList.add('is_admin');
            pwModal.close();
            pwInput.value = '';
            pwError.textContent = '';
        } else {
            pwInput.value = '';
            showError('비밀번호가 올바르지 않습니다.');
            pwInput.focus();
        }
    }

    document.getElementById('admin_pw_confirm').addEventListener('click', tryLogin);
    document.getElementById('admin_pw_cancel').addEventListener('click', () => {
        pwModal.close();
        pwInput.value = '';
        pwError.textContent = '';
    });
    pwInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') tryLogin();
    });
    pwModal.addEventListener('keydown', e => {
        if (e.key === 'Escape') { pwInput.value = ''; pwError.textContent = ''; }
    });

    document.getElementById('admin_logout_confirm').addEventListener('click', () => {
        sessionStorage.removeItem('isAdmin');
        document.body.classList.remove('is_admin');
        logoutModal.close();
    });
    document.getElementById('admin_logout_cancel').addEventListener('click', () => {
        logoutModal.close();
    });

    document.querySelectorAll('.admin_trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            if (isAdmin()) {
                logoutModal.showModal();
            } else {
                pwInput.value = '';
                pwError.textContent = '';
                pwModal.showModal();
                setTimeout(() => pwInput.focus(), 50);
            }
        });
    });
}
