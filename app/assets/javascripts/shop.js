$(document).ready(function() {
  // var $showProducts = $('#show-products');
  var $productForm = $('#add-product-form');
  var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';
  var $productName = $('#product-name');
  var $productDescription = $('#product-description');
  var $productColor = $('#product-color');
  var $productBasePrice = $('#product-base-price');
  var $productQuanity = $('#product-quanity');
  var $productWeight = $('#product-weight');
  var $productOtherAttributes = $('#product-other-attributes');
  var $products = $('#products')

  function loadProducts() {
    $products.empty();
    $.ajax({
      type: 'GET',
      url: BASEURL + '/products',
      dataType: 'JSON',
    }).success(function(data) {
      for(var i = 0; i < data.length; i++) {
        var product = data[i];
        $products.append('<div id=' + product.id + ' class="row"> <div class="col s12 m6"> <div class="card blue-grey darken-1"> <div class="card-content white-text"> <span class="card-title">' + product.name + '</span> <p>' + data.description + '</p> <p>' + data.color + '</p> <p>' + data.base_price + '</p> <p>' + data.quanity_on_hand + '</p> <p>' + data.weight + '</p> <div class="card-action"> <button class="orange btn edit-product"><i class="material-icons">Edit</i></button><button class="red btn delete-product"><i class="material-icons">Delete</i></button></div> </div> </div> </div> </div>')
      }
    }).fail(function(data) {
      alert("Something is wrong with the code. Sorry!!");
    });
  }

  $(document).on('click', '.edit-product', function() {
    var productId = $(this).parent().attr('id');
    $.ajax({
      type:'GET',
      url: BASEURL + '/products/' + productId,
      dataType: 'JSON',
    }).success(function(data) {
      $productName.val(data.name).focus();
      $productDescription.val(data.description);
      $productColor.val(data.color);
      $productBasePrice.val(data.base_price);
      $productQuanity.val(data.quanity_on_hand);
      $productWeight.val(data.weight);
    }).fail(function(data) {
      alert("Something is wrong with the code. Sorry!!");
    })
  })

  //   $(document).on('click', '.view-product', function() {
  //   var productId = $(this).parent().attr('id');
  //   $.ajax({
  //     type:'GET',
  //     url: BASEURL + '/products/' + productId,
  //     dataType: 'JSON',
  //   }).success(function(data) {
  //     console.log('show')
  //     $products.append("<div>" + data.name + " " + data.description + " " + data.color + " " + data.base_price + " " + data.quanity_on_hand + " " + data.weight + "</div>")
  //   }).fail(function(data) {
  //     alert("Something is wrong with the code. Sorry!!");
  //   })
  // })

  $(document).on('click', '.delete-product', function() {
    var productId = $(this).parent().attr('id');
    $.ajax({
      type: 'DELETE',
      url: BASEURL + '/products/' + productId,
      dataType: 'JSON',
    }).success(function(data) {
      $('#' + productId).remove();
    }).fail(function(data) {
      alert("Something is wrong with the code. Sorry!!");
    });
  })

  $productForm.submit(function(e) {
    e.preventDefault();
    var requestType, requestUrl;

    if($(this).data('product-id')) {
      requestType = 'PUT';
      requestUrl = BASEURL + '/products/' + $(this).data('product-id');
    } else {
      requestType = 'POST';
      requestUrl = BASEURL + '/products';
    }
    $.ajax({
      type: requestType,
      url: requestUrl,
      dataType: 'JSON',
      data: { product: {name: $productName.val(),
                        base_price: $productBasePrice.val()
                        description: $productDescription.val(),
                        quanity_on_hand: $productQuanity.val(),
                        color: $productColor.val(),
                        weight: $productWeight.val(),
                        other_attributes: $productOtherAttributes.val(),
                        }}
    }).success(function(data) {
      $productForm[0].reset();
      $productName.focus();
      loadProducts();
    }).fail(function(data) {
      alert("Something is wrong with the code. Sorry!!");
    });
  });
    loadProducts();
});
