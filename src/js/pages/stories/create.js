import { addStory } from '../../network/stories';
import Swal from 'sweetalert2';

const CreateStory = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const storyForm = document.querySelector('story-form');
    
    if (storyForm) {
      storyForm.addEventListener('story-submitted', async (e) => {
        const { photo, description } = e.detail;
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('description', description);

        const submitBtn = storyForm.querySelector('#submitBtn');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading...`;
        submitBtn.disabled = true;

        try {
          const response = await addStory(formData);
          if (!response.error) {
            await Swal.fire({
              icon: 'success',
              title: 'Berhasil',
              text: 'Story berhasil ditambahkan!',
              timer: 1500,
              showConfirmButton: false,
            });
            window.location.href = '/';
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: error.message || 'Gagal menambahkan story',
          });
        } finally {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      });
    }
  }
};

export default CreateStory;
