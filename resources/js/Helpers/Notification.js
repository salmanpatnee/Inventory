class Notification {

    toast(msg = 'Successfully Done', icon = 'success') {
        Toast.fire({
            icon: icon,
            title: msg
        });
    }

    success(msg = 'Successfully Done') {
        this.toast(msg);
    }

    alert(msg = 'Warning') {
        this.toast(msg, 'alert');
    }

    error(msg = 'Error') {
        this.toast(msg, 'error');
    }

    confirmDialogAtts(title = 'Are you sure?', text = 'You won\'t be able to revert this!') {
        return {
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }
    }
}

export default Notification = new Notification();