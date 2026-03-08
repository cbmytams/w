export function restartTour() {
    localStorage.removeItem('admin_tour_completed');
    window.location.reload();
}
