const Dashboard = {
  currentPage: 1,
  itemsPerPage: 4,
  
  async init() {
    await this._initialData();
  },
  
  async _initialData() {
    try {
      this._renderStoryCards();
      
      setTimeout(async () => {
        try {
          const fetchRecords = await fetch('/data/DATA.json');
          const responseRecords = await fetchRecords.json();
          
          if (!responseRecords.error) {
            this.stories = responseRecords.listStory;
            this._renderStoryCards(this.stories, this.currentPage);
            this._renderModals(this.stories);
            this._renderPagination(this.stories.length);
          }
        } catch (error) {
          console.error('Error fetching stories:', error);
        }
      }, 2000);
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  },
  
  _renderStoryCards(stories = [], page = 1) {
    const storyContainer = document.querySelector('#stories');
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedStories = stories.slice(startIndex, endIndex);
    
    if (stories.length === 0) {
      storyContainer.innerHTML = `
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        ${Array.from({ length: 8 }).map(() => this._templatePlaceholderCard()).join('')}
      </div>
    `;
    } else {
      storyContainer.innerHTML = `
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        ${paginatedStories.map((story, index) => this._templateStoryCard(story, index + startIndex)).join('')}
      </div>
    `;
    }
  },
  
  _templatePlaceholderCard() {
    return `
    <div class="col mb-4">
      <div class="card" aria-hidden="true">
        <img src="https://via.placeholder.com/150" class="card-img-top" alt="Placeholder Image" />
        <div class="card-body">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
          </h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-8"></span>
          </p>
        </div>
      </div>
    </div>
  `;
  },
  
  _templateStoryCard(story, index) {
    const { date, time } = this._formatDate(story.createdAt);
    return `
      <div class="col mb-4">
        <div class="card" data-bs-toggle="modal" data-bs-target="#storyModal${index}" style="cursor: pointer;">
          <img src="${story.photoUrl}" class="card-img-top" alt="Story Image">
          <div class="card-body">
            <h5 class="card-title">${story.name}</h5>
            <p class="card-text description">
              ${story.description}
            </p>
          </div>
          <div class="card-footer">
            <small class="text-body-secondary">${date}<br>${time}</small>
          </div>
        </div>
      </div>
    `;
  },
  
  _renderModals(stories) {
    const modalContainer = document.querySelector('#modalContainer');
    modalContainer.innerHTML = stories.map((story, index) => this._templateModal(story, index)).join('');
  },
  
  _templateModal(story, index) {
    const { date, time } = this._formatDate(story.createdAt);
    return `
      <div class="modal fade" id="storyModal${index}" tabindex="-1" aria-labelledby="storyModalLabel${index}" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="storyModalLabel${index}">${story.name}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <img src="${story.photoUrl}" class="img-fluid mb-3" alt="Story Image">
              <p>${story.description}</p>
              <p class="text-muted"><small>${date}<br>${time}</small></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  
  _formatDate(dateString) {
    const dateObj = new Date(dateString);
    const optionsDate = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    
    return {
      date: new Intl.DateTimeFormat('id-ID', optionsDate).format(dateObj),
      time: new Intl.DateTimeFormat('id-ID', optionsTime).format(dateObj),
    };
  },
  
  _renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    const paginationContainer = document.querySelector('#pagination');
    
    let paginationHTML = `
      <nav aria-label="Page navigation example">
        <ul class="pagination">
    `;
    
    if (this.currentPage > 1) {
      paginationHTML += `<li class="page-item"><a class="page-link" href="#" data-action="prev">Previous</a></li>`;
    }
    
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `
        <li class="page-item ${i === this.currentPage ? 'active' : ''}">
          <a class="page-link" href="#" data-action="page" data-page="${i}">${i}</a>
        </li>
      `;
    }
    
    if (this.currentPage < totalPages) {
      paginationHTML += `<li class="page-item"><a class="page-link" href="#" data-action="next">Next</a></li>`;
    }
    
    paginationHTML += `</ul></nav>`;
    
    paginationContainer.innerHTML = paginationHTML;
    
    this._addPaginationEventListeners();
  },
  
  _addPaginationEventListeners() {
    document.querySelector('#pagination').addEventListener('click', (event) => {
      const target = event.target;
      
      if (target.tagName === 'A') {
        event.preventDefault();
        const action = target.getAttribute('data-action');
        
        if (action === 'prev') {
          this.currentPage = Math.max(1, this.currentPage - 1);
        } else if (action === 'next') {
          this.currentPage = Math.min(Math.ceil(this.stories.length / this.itemsPerPage), this.currentPage + 1);
        } else if (action === 'page') {
          this.currentPage = parseInt(target.getAttribute('data-page'), 10);
        }
        
        this._renderStoryCards(this.stories, this.currentPage);
        this._renderPagination(this.stories.length);
      }
    });
  },
};

export default Dashboard;
