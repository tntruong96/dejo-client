export function FormatCurrency(money: string | number): string {
    if(isNaN(Number(money))){
        return '';
    }
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(money));
}