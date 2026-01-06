
$(document)
.on('click', '#mobileNavToggle', function () {
	
	let $body = $('body');
	
	if($body.hasClass('mobile-open'))
	{
		mobileNavClose();
	} else {
		mobileNavOpen();
	}
});

function mobileNavOpen()
{
	$('body').addClass('mobile-open');
	$('#mobileNav').fadeIn(300);
	
	let $mobileList = $('#mobileNavList');
	
	if(!$mobileList.hasClass('mobile-nav-init'))
	{
		$mobileList.html($('#headerNav').html());
		$mobileList.addClass('mobile-nav-init');
	}
	
}

function mobileNavClose()
{
	$('body').removeClass('mobile-open');
	$('#mobileNav').hide();
}



$(document).on('click', '[data-nav-anchor]', function (event) {
	
	event.preventDefault();
	
	let id = $(this).attr('href'),
		offset = $(window).width() > 768 ? 50 : 80;
	
	if($(id).length)
	{
		$('html, body').animate({scrollTop: $(id).offset().top - offset}, 500);
		mobileNavClose();
	}
	
	return false;
	
});


$(document)
.on('click', '[data-toggle="modal"]', function(event){
	
	event.preventDefault();
	
	let el = $(this),
		id = el.is('a')
			? el.attr('href')
			: el.attr('data-modal-target');
	
	modal_show(id);
	
	return false;
	
})

.on('click', '[data-modal="close"]', function(event){

	event.preventDefault();

	let c = $(this).closest('[data-modal-container]');

	c.hide();
	c.find('.modal').removeClass('show');

	$('body').removeClass('overflow');

})

.on('click', '[data-modal-container]', function(event){

	let t = $(event.target);

	if(t.is('[data-modal-container]'))
	{
		modal_hide(t.attr('data-modal-container'));
	}

})

.on('keydown',function(event){
	if (event.which === 27)
	{
		let p = $('.modal.show');

		if(p.length)
		{
			modal_hide('#' + p.attr('id'));
		}
	}
});

function modal_show(id)
{
	if($('body > [data-modal-container="' + id + '"]').length == 0)
	{
		$('body').append('<div class="modal-container" data-modal="container" data-modal-container="' + id + '"></div>');
		$(id).appendTo('[data-modal-container="' + id + '"]');
		
		$('[data-modal-container="' + id + '"]').css('display', 'flex').hide();
	}

	$('body').addClass('overflow');

	$('[data-modal-container="' + id + '"]').fadeIn(100, function(){
		$('[data-modal-container="' + id + '"] .modal').addClass('show');
	});
}

function modal_hide(id)
{
	$(id).removeClass('show');
	$(id).closest('[data-modal-container]').hide();

	$('body').removeClass('overflow');
}

document.querySelectorAll('input[name="phone"]').forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-9+\-\(\)\s]/g, '');
    });
});

document.querySelectorAll('input[name="name"]').forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^A-Za-zА-Яа-яЁё\s]/g, '');
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const WORKER_URL = 'https://telegramform2.shmyrov-900.workers.dev';

  document.querySelectorAll('form[data-telegram]').forEach(form => {

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const website = form.querySelector('[name="website"]')?.value;
      if (website) return;

      const name = form.querySelector('[name="name"]')?.value.trim();
      const phone = form.querySelector('[name="phone"]')?.value.trim();

      if (!name || !phone) {
        alert('Заполните имя и телефон');
        return;
      }

      try {
        const res = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone })
        });

        if (!res.ok) throw new Error('Ошибка сервера');

        const data = await res.json();

        if (data.success) {
          alert('Заявка отправлена!');
          form.reset();
        } else {
          alert('Ошибка отправки');
        }

      } catch (err) {
        alert('Ошибка соединения');
        console.error(err);
      }
    });

  });
});

const tabs = 'data-toggle="tabs"',
	tabsLink = 'data-tabs="link"',
	tabsContent = 'data-tabs="content"';


$(document).on('click', '[' + tabsLink + ']', function(event){

	event.preventDefault();

	let el = $(this),
		p = el.closest('[' + tabs + ']'),
		i = el.attr('href');

	if(!el.hasClass('current'))
	{
		p.find('[' + tabsLink + ']').removeClass('current');
		el.addClass('current');

		p.find('[' + tabsContent + ']').hide();
		$(i).fadeIn(500);
	}

	return false;



});