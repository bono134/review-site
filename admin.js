// 비밀번호는 여기서 변경하세요
const ADMIN_PW = 'dodok';

export function isAdmin() {
    return sessionStorage.getItem('isAdmin') === '1';
}

export function setupAdminTrigger() {
    if (isAdmin()) document.body.classList.add('is_admin');

    const trigger = document.getElementById('admin_trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
        if (isAdmin()) {
            if (!confirm('관리자 모드를 종료하시겠습니까?')) return;
            sessionStorage.removeItem('isAdmin');
            document.body.classList.remove('is_admin');
        } else {
            const pw = prompt('관리자 비밀번호를 입력하세요');
            if (pw === null) return;
            if (pw === ADMIN_PW) {
                sessionStorage.setItem('isAdmin', '1');
                document.body.classList.add('is_admin');
            } else {
                alert('비밀번호가 올바르지 않습니다.');
            }
        }
    });
}
