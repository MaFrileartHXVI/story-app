import { fetchStories } from '../network/stories';

const Dashboard = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    try {
      const storyContainer = document.querySelector('#storyList');
      const loading = document.querySelector('#loading');

      const stories = await fetchStories();

      if (loading) {
        loading.remove();
      }

      if (!stories || stories.length === 0) {
        storyContainer.innerHTML = `
          <div class="col-12 text-center py-5">
            <p class="text-muted">Tidak ada cerita untuk ditampilkan.</p>
          </div>
        `;
      } else {
        storyContainer.innerHTML = '';
        stories.forEach((story) => {
          const col = document.createElement('div');
          col.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4');

          const storyCard = document.createElement('story-card');
          storyCard.story = story;

          col.appendChild(storyCard);
          storyContainer.appendChild(col);
        });
      }
    } catch (error) {
      console.error('Error initializing data:', error);
      const storyContainer = document.querySelector('#storyList');
      const loading = document.querySelector('#loading');
      if (loading) loading.remove();
      
      storyContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <p class="text-danger">Gagal mengambil data cerita: ${error.message || 'Error Server'}</p>
        </div>
      `;
    }
  },
};

export default Dashboard;
