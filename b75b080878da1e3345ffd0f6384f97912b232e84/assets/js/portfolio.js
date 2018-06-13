$(window).bind('load', function() {
    $("#preloader").remove();

    fetchContent('/b75b080878da1e3345ffd0f6384f97912b232e84/assets/data/projects.json')
    .then((allProjects) => {

        var currentProject = allProjects.projects.find(function(project) {
            let currentLocation = this.location.href.substr(this.location.href.lastIndexOf('/') + 1);
            return project.base_url == currentLocation;
          });

        if (currentProject != undefined)
          buildContent(currentProject);
        else {
          var module = {
              init: function(selector) {
                  var me = this;
                  this.collection = $(selector);
                  this.plugins();
                  $(window).on('resize', function(e) {
                      me.collection.each(function() {
                          var size = me.resize(this);
                          $(this).turn('size', size.width, size.height);
                      });
                  }).resize();
              },
              resize: function(el) { // reset the width and height to the css defaults           
                  el.style.width = '';
                  el.style.height = '';
                  var width = Math.round(el.clientWidth * 1.05),
                      height = Math.round(width * 1.32); // set the width and height matching the aspect ratio            
                  el.style.width = width + 'px';
                  el.style.height = height + 'px';
                  return {
                      width: width,
                      height: height
                  };
              },
              plugins: function() { // run the plugin            
                  this.collection.each(function() {
                      $(this).turn({
                          gradients: true,
                          acceleration: true,
                          display: 'single'
                      });
                  }); // hide the body overflow        
              }
          };
          module.init('.book');
        }
    });

    
});


function buildContent(articleData)
{
        let innerArticle = createNode('div', 'inner-article');
        articleData.mainImage.forEach(function(image) {
            if (image.info !== undefined) {
              innerArticle.innerHTML += `<div class="inner-info well">${image.info}</div>` 
            }
            innerArticle.innerHTML += `<img class="responsive" src="${image.image}" />`
        });

        let articleInfo = buildArticleInfo(articleData);

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
            <a href="/b75b080878da1e3345ffd0f6384f97912b232e84/#portfolio"><i class="fa fa-th"></i></a>
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
                <div>
                  ${articleInfo}
                </div>
              </div><!--end info-detail-->
            </div>
          </div>
          <div class="col-md-12 col-xs-12">
            ${innerArticle.outerHTML}
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
      </div>`
}

function buildArticleInfo(articleData) {
  let infoDiv = createNode('div');
  if (articleData.brief !== undefined)
    infoDiv.innerHTML += `<h4>Brief</h4>
    <p>${articleData.brief}</p>`

  if (articleData.overview !== undefined)
  infoDiv.innerHTML += `<h4>Brief</h4>
  <p>${articleData.overview}</p>`

  if (articleData.solution !== undefined)
  infoDiv.innerHTML += `<h4>Brief</h4>
  <p>${articleData.solution}</p>`

  return infoDiv.outerHTML;

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