const CreateStory = {
  async init() {
    this._initialListener();
  },
  
  _initialListener() {
    const photoInput = document.querySelector('#storyPhoto');
    photoInput.addEventListener('change', () => {
      this._updatePhotoPreview();
    });
    
    const createStoryForm = document.querySelector('#createStoryForm');
    createStoryForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        if (this._validateForm()) {
          this._sendPost();
        }
        
        createStoryForm.classList.add('was-validated');
      },
      false,
    );
  },
  
  async _sendPost() {
    const formData = this._getFormData();
    
    if (this._validateFormData(formData)) {
      console.log('formData');
      console.log(formData);
      
      this._goToDashboardPage();
    }
  },
  
  _getFormData() {
    const descriptionInput = document.querySelector('#storyDescription');
    const photoInput = document.querySelector('#storyPhoto');
    
    const formData = new FormData();
    formData.append('description', descriptionInput.value);
    formData.append('photo', photoInput.files[0]);
    
    return formData;
  },
  
  _updatePhotoPreview() {
    const photoPreview = document.querySelector('#photoPreview');
    const photoInput = document.querySelector('#storyPhoto');
    
    const photo = photoInput.files[0];
    if (!photo) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      photoPreview.classList.remove('d-none');
      photoPreview.style.backgroundImage = `url('${event.target.result}')`;
    };
    
    reader.readAsDataURL(photo);
  },
  
  _validateForm() {
    const form = document.querySelector('#createStoryForm');
    const descriptionInput = document.querySelector('#storyDescription');
    const photoInput = document.querySelector('#storyPhoto');
    
    let isValid = true;
    
    if (!descriptionInput.value.trim()) {
      descriptionInput.classList.add('is-invalid');
      isValid = false;
    } else {
      descriptionInput.classList.remove('is-invalid');
    }
    
    if (!photoInput.files.length) {
      photoInput.classList.add('is-invalid');
      isValid = false;
    } else {
      photoInput.classList.remove('is-invalid');
    }
    
    return isValid;
  },
  
  _goToDashboardPage() {
    window.location.href = '/';
  },
};

CreateStory.init();
