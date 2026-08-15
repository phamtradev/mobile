import type { ProfileDraft, ProfileField } from '@/types/campus';

export type ProfileErrors = Partial<Record<ProfileField, string>>;

export const SUMMARY_LIMIT = 500;

const STUDENT_ID = /^\d{8}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^0\d{9}$/;
const BIRTH_DATE = /^(\d{2})\/(\d{2})\/(\d{4})$/;

function isRealDate(day: number, month: number, year: number) {
    if (month < 1 || month > 12) return false;
    const daysInMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
}

function validateFullName(raw: string): string | undefined {
    if (raw.length > 0 && raw.trim().length === 0) {
        return 'Họ và tên đang chỉ chứa dấu cách. Nhập họ tên như trên thẻ sinh viên, ví dụ Phạm Văn Trà.';
    }
    if (raw.trim().length === 0) {
        return 'Chưa nhập họ và tên. Nhập đúng như trên thẻ sinh viên, ví dụ Phạm Văn Trà.';
    }
    if (raw.trim().length < 2) {
        return 'Họ và tên quá ngắn. Nhập đầy đủ họ và tên, ví dụ Phạm Văn Trà.';
    }
    if (/\d/.test(raw)) {
        return 'Họ và tên không được chứa chữ số. Xoá các ký tự số rồi nhập lại.';
    }
    return undefined;
}

function validateStudentId(raw: string): string | undefined {
    const value = raw.trim();
    if (value.length === 0) {
        return 'Chưa nhập mã số sinh viên. Mã gồm 8 chữ số, ví dụ 23633471.';
    }
    if (/\D/.test(value)) {
        return 'Mã số sinh viên chỉ gồm chữ số. Bỏ chữ và ký tự đặc biệt, ví dụ 23633471.';
    }
    if (!STUDENT_ID.test(value)) {
        return `Mã số sinh viên phải có đúng 8 chữ số. Hiện đang có ${value.length} chữ số, ví dụ đúng là 23633471.`;
    }
    return undefined;
}

function validateEmail(raw: string): string | undefined {
    const value = raw.trim();
    if (value.length === 0) {
        return 'Chưa nhập email. Dùng email trường cấp, ví dụ 23633471@sv.truong.edu.vn.';
    }
    if (!value.includes('@')) {
        return 'Email thiếu ký tự @. Ví dụ đúng là 23633471@sv.truong.edu.vn.';
    }
    if (!EMAIL.test(value)) {
        return 'Email thiếu phần tên miền sau dấu @. Ví dụ đúng là 23633471@sv.truong.edu.vn.';
    }
    return undefined;
}

function validatePhone(raw: string): string | undefined {
    const value = raw.replace(/\s/g, '');
    if (value.length === 0) {
        return 'Chưa nhập số điện thoại. Nhập 10 chữ số bắt đầu bằng 0, ví dụ 0912345678.';
    }
    if (!PHONE.test(value)) {
        return `Số điện thoại phải có 10 chữ số và bắt đầu bằng 0. Hiện đang có ${value.length} ký tự, ví dụ đúng là 0912345678.`;
    }
    return undefined;
}

function validateAddress(raw: string): string | undefined {
    if (raw.length > 0 && raw.trim().length === 0) {
        return 'Địa chỉ đang chỉ chứa dấu cách. Nhập số nhà, đường, phường và tỉnh hoặc thành phố.';
    }
    if (raw.trim().length === 0) {
        return 'Chưa nhập địa chỉ liên hệ. Nhập số nhà, đường, phường và tỉnh hoặc thành phố.';
    }
    return undefined;
}

function validateBirthDate(raw: string): string | undefined {
    const value = raw.trim();
    if (value.length === 0) {
        return 'Chưa nhập ngày sinh. Nhập theo dạng ngày/tháng/năm, ví dụ 05/09/2005.';
    }
    const match = BIRTH_DATE.exec(value);
    if (!match) {
        return 'Ngày sinh sai định dạng. Nhập theo dạng ngày/tháng/năm có đủ số 0, ví dụ 05/09/2005.';
    }

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    if (!isRealDate(day, month, year)) {
        return `Ngày ${value} không tồn tại. Kiểm tra lại ngày và tháng, ví dụ 05/09/2005.`;
    }
    if (year < 1950 || year > 2020) {
        return `Năm sinh ${year} nằm ngoài khoảng hợp lệ 1950 đến 2020. Kiểm tra lại năm sinh.`;
    }
    return undefined;
}

function validateSummary(raw: string): string | undefined {
    const length = raw.trim().length;
    if (length === 0) {
        return 'Chưa viết giới thiệu. Viết vài dòng về ngành học và định hướng của bạn.';
    }
    if (length > SUMMARY_LIMIT) {
        return `Giới thiệu tối đa ${SUMMARY_LIMIT} ký tự. Hiện đang có ${length} ký tự, cần bớt ${length - SUMMARY_LIMIT} ký tự.`;
    }
    return undefined;
}

export function validateProfile(draft: ProfileDraft): ProfileErrors {
    const errors: ProfileErrors = {};

    const checks: Record<ProfileField, string | undefined> = {
        fullName: validateFullName(draft.fullName),
        studentId: validateStudentId(draft.studentId),
        email: validateEmail(draft.email),
        phone: validatePhone(draft.phone),
        address: validateAddress(draft.address),
        birthDate: validateBirthDate(draft.birthDate),
        summary: validateSummary(draft.summary),
    };

    for (const [field, message] of Object.entries(checks)) {
        if (message) errors[field as ProfileField] = message;
    }

    return errors;
}
