$(window).bind('load', function() {
    $("#preloader").remove();

    fetchContent('../assets/data/projects.json')
    .then((allProjects) => {

        var currentProject = allProjects.projects.find(function(project) {
            let currentLocation = this.location.href.substr(this.location.href.lastIndexOf('/') + 1);
            return project.base_url == currentLocation;
          });

        if (currentProject != undefined)
          buildContent(currentProject);
        //checkImageLoaded();
    });

    
});

function checkImageLoaded()
{
    let currentImage = $('.inner-article > img')[0];
    if (!currentImage.complete) {
        setTimeout('checkImageLoaded()', 20);
        return;
    }
    else {
        $('.info-detail').height($('.inner-article').height());
    }
}


function buildContent(articleData)
{
        let sectionContent = $('.main-content')[0];
        sectionContent.innerHTML = 
        `<article class="detail-article">
        <div class="heading-compose">
          <div class="panel-title">
            <h2 class="title-single">${articleData.title}</h2>
            <div class="type-detail">
              <span><strong>${articleData.tags}</strong> </span>
            </div>
          </div><!--end panel-title-->
          <div class="customNavigation">
            <a href="${articleData.prev}" class="newBtn prev">Prev</a>
            <a href="/#portfolio"><i class="fa fa-th"></i></a>
            <a href="${articleData.next}" class="newBtn next">Next</a>
          </div><!--end customNavigation-->
        </div><!--end heading-compose-->
        <div class="row">
        <div class="col-md-12 col-xs-12">
            <div class="inner-single">
              <div class="info-detail">
                <ul class="list-unstyled">
                  <li>
                    <i class="icon-star icons">&nbsp;</i>
                    <span class="name-single">Client:</span>
                    <span class="detail-single">
                      <strong>${articleData.client}</strong>
                    </span>
                  </li>
                </ul>
                <h4>Brief</h2>
                <p>${articleData.brief}</p>
                <h4>Overview</h2>
                <p>${articleData.overview}</p>
                <h4>Solution</h2>
                <p>${articleData.solution}</p>
              </div><!--end info-detail-->
            </div>
          </div>
          <div class="col-md-12 col-xs-12">
            <div class="inner-article">
              <img src="${articleData.mainImage}" />
            </div>
          </div>
        </div>
        
      </article>
      <!--end detail-article-->
      <div class="portfolio-bottom">
        <div class="customNavigation">
            <a href="${articleData.prev}" class="newBtn prev">Prev</a>
            <a href="/#portfolio"><i class="fa fa-th"></i></a>
            <a href="${articleData.next}" class="newBtn next">Next</a>
        </div><!--end customNavigation-->
      </div>
    </div>`
}


function createNode(element, newClass) {
	let newEle = document.createElement(element);
	if (newClass !== undefined)
		newClass.split(' ').map(function(subClass) {
			newEle.classList.add(subClass);
		});
	return newEle;
}

function append(parent, el) {
	return parent.appendChild(el);
}

async function fetchContent(url) {
	return await fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {
			return data;
		})
		.catch(function (error) {
			console.log(error);
		});
}