jQuery(document).ready(function () {

    if (jQuery('.moduleProductName').length) {
        hmax = 0;
        jQuery('.moduleProductName').each(function () {
            hName = jQuery(this).height();
            if (hName > hmax) {
                hmax = hName;
            }
        })
        jQuery('.moduleProductName').css('height', hmax + 'px');
    }

    jQuery('body').on('click', '.prodAddToCart', function () {
        product_id = jQuery(this).attr('data-p');
        category_id = jQuery(this).attr('data-c');
        quantity = 1;

        jQuery.ajax({
            url: "/index.php?option=com_jshopping&controller=cart&task=add",
            type: "GET",
            data: { category_id: category_id, product_id: product_id, quantity: quantity, ajax_alex: 1 },
            dataType: "json",
            success: function (json) {

                alert = '';

                if (json.length) {
                    alert = json[0].message;
                } else {
                    alert = json['data'];
                    //jQuery('.cartVal').text(json['count_product']);
                }

                jQuery('.msgAlert').remove();

                html = '<div class="alert alert-success msgAlert"><a class="close closeP" data-dismiss="alert">×</a><div><p class="alert-message">' + alert + '</p></div></div>';
                jQuery('body').append(html);
                setTimeout(function () {
                    jQuery('.msgAlert').remove();
                }, 3000);
            }
        });

        return false;
    });


    jQuery(".product_minus").click(function () {
        field = jQuery(this).closest('.btnQuantBtn');
        quant = parseInt(field.find('.product_quant').val());
        if (quant > 1) {
            field.find('.product_quant').val(quant - 1);
            jQuery('form[name="updateCart"]').submit();
        }
    })
    jQuery(".product_plus").click(function () {
        field = jQuery(this).closest('.btnQuantBtn');
        quant = parseInt(field.find('.product_quant').val());
        field.find('.product_quant').val(quant + 1);
        jQuery('form[name="updateCart"]').submit();
    })

    jQuery("#top-bottom").click(function () {
        jQuery("body,html").animate({
            scrollTop: 0
        }, 500);
    });


    if (jQuery(window).scrollTop() > 100) {
        jQuery("#top-bottom").fadeIn();
    } else {
        jQuery("#top-bottom").fadeOut();
    }
    jQuery(window).scroll(function () {
        if (jQuery(window).scrollTop() > 100) {
            jQuery("#top-bottom").fadeIn();
        } else {
            jQuery("#top-bottom").fadeOut();
        }
    });

    jQuery('body').on('click', '.main_menu__link-item, .btn, .header_menu a', function () {
        if (jQuery(this).attr('href')) {
            linkAnchor = jQuery(this).attr('href').replace('#', '');
            if (jQuery('[data-anchor="' + linkAnchor + '"]').length) {
                jQuery("body,html").animate({
                    scrollTop: jQuery('[data-anchor="' + linkAnchor + '"]').offset().top
                }, 700);
            }
        }
        //return false;
    });

    jQuery('.img_bg__arrow_mobile').click(function () {
        idNext = jQuery(this).closest('.module').next().attr('id');
        jQuery("body,html").animate({
            scrollTop: jQuery('#' + idNext).offset().top
        }, 500);
    });

    jQuery('body').on('click', '.accordion_top', function () {
        jQuery(this).closest('.accordion_item').find('.accordion_bottom').slideToggle().toggleClass('accordion_open');
        jQuery(this).closest('.accordion_item').toggleClass('accordion_open');
    });

    jQuery('body').on('click', '.tab_item_top', function () {
        id = jQuery(this).attr('data-tab-number');
        jQuery(this).closest('.tabBlock').find('.tab_item_top').removeClass('tab_top_active');
        jQuery(this).addClass('tab_top_active');

        jQuery(this).closest('.tabBlock').find('.tab_item_bottom').removeClass('tab_bottom_active');
        jQuery(this).closest('.tabBlock').find('.tab_item_bottom[data-tab-content-number="' + id + '"]').addClass('tab_bottom_active');
    });

});

