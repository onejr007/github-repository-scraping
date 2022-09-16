

(function ($) {
  $(document).ready(function() {
    var data = {items:[]};
    const cont = document.querySelector('.box');
    const searchBar = document.querySelector('.search-bar_read');
    const centerWrapper = document.querySelector('.center-wrapper_read');
    const hider = document.querySelector('.discription_read');
    const loader = document.querySelector('.loader_read');
    const err = document.querySelector('.error_read');
    const defaultURL = 'onejr007';

    searchBar.addEventListener("input", function(e) {
      var raw_text =  $(this).val();
      var return_text = raw_text.replace(/[^a-zA-Z0-9 _]/g,'');
      $(this).val(return_text);
      if( return_text.length!=0) {
        data.items.length = 0;
        $('#example').dataTable().fnDestroy();
        submit();
      }else{
        data.items.length = 0;
        $('#example').dataTable().fnDestroy();
        cont.classList.remove('animation_read')
        loader.classList.add('hide_read');
        hider.classList.remove('hide_read');
        err.classList.add('hide_read');
        centerWrapper.classList.add('hide_read');
      }
    });
    
    document.querySelector('.click_read').addEventListener('click' , () => {
      searchBar.value = defaultURL;
      data.items.length = 0;
      $('#example').dataTable().fnDestroy();
      submit()
    })

    function countInstances(string, word) {
      return string.split(word).length - 1;
    };

    function submit(e) {
      e && e.preventDefault();
      data.items.length = 0;
      $('#example').dataTable().fnDestroy();
      loader.classList.remove('hide_read');
      hider.classList.add('hide_read');
      var letter = searchBar.value;
      cont.classList.add('animation_read');
      centerWrapper.classList.add('hide_read');
      err.classList.add('hide_read');
      if (letter != ''||letter != null||letter.length != null||letter.length != 0) {
        $.ajax({
          type: 'POST',
          data: {'letter':letter},
          url: './fetch.php',
          success: function(json_data) {
            var test= json_data.toString();
            test=test.replace('        ', '');
            test=test.replace('        ', '');
            test=test.replace('       ', '');
            test=test.replace('      ', '');
            test=test.replace('     ', '');
            test=test.replace('    ', '');
            test=test.replace('   ', '');
            test=test.replace('  ', '');
            test=test.replace('"', '');
            test=test.replace('"', '');
            var check = test.substring(0, 6);
            if (check!='<br />'){
              let x = countInstances(test,'|Public|');
              var subStr = '';
              var repo ='';
              var markup ='';
              var start_pos ='';
              var end_pos ='';
              let z =1;
              for(z=z;z<=x;z++){
                if(z==1){
                  repo=test;
                  start_pos = repo.indexOf('|') + 1;
                  end_pos = repo.indexOf('|Public|',start_pos);
                  subStr = repo.substring(start_pos,end_pos);
                  markup = "<a href='https://github.com/"+letter+"/"+ subStr +"' target='_blank'>"+subStr+"</a>";
                  data.items.push(
                    {no: (z-1), repository: markup}
                  );
                  repo = repo.replace('|'+subStr+'|Public|', "");
                } else {
                  repo=repo;
                  start_pos = repo.indexOf('|') + 1;
                  end_pos = repo.indexOf('|Public|',start_pos);
                  subStr = repo.substring(start_pos,end_pos);
                  if (subStr.indexOf('|') != 0) {
                    subStr = subStr.split("|").pop();
                  }
                  markup = "<a href='https://github.com/"+letter+"/"+ subStr +"' target='_blank'>"+subStr+"</a>";
                  data.items.push(
                    {no: (z-1), repository: markup}
                  );
                  repo = repo.replace('|'+subStr+'|Public|', "");
                }
              }
              let k = z;
              let i = 2;
              check_more(letter,i,k);
            }else{
              centerWrapper.classList.add('hide_read');
              loader.classList.add('hide_read');
              err.classList.remove('hide_read');
            }
          }
        });
      }else{
        loader.classList.remove('hide_read');
        err.classList.remove('hide_read');
        hider.classList.remove('hide_read');
        centerWrapper.classList.add('hide_read');
        loader.classList.add('hide_read');
      }
    }

    function check_more(letter,i,k){
      $.ajax({
        type: 'POST',
        data: {'letter':letter},
        url: './fetch_more.php',
        success: function(json_data) {
          var test= json_data.toString();
          var check = test.substring(0, 6);
          if (check!='<br />'){
            nextFetch(letter,i,k);
          }
          finish();
        }
      });
    }

    function nextFetch(letter,i,k){
      $.ajax({
        type: 'POST',
        data: {'letter':letter,'i':i},
        url: './fetch_next.php',
        success: function(json_data) {
          var test= json_data.toString();
          var check = test.substring(0, 6);
          if (check!='<br />'){
            var test= json_data.toString();
            test=test.replace('        ', '');
            test=test.replace('        ', '');
            test=test.replace('       ', '');
            test=test.replace('      ', '');
            test=test.replace('     ', '');
            test=test.replace('    ', '');
            test=test.replace('   ', '');
            test=test.replace('  ', '');
            test=test.replace('"', '');
            test=test.replace('"', '');
            loader.classList.add('hide_read');
            centerWrapper.classList.remove('hide_read');
            let z = countInstances(test,'|Public|');
            let x = z;
            let n = k;
            var subStr = '';
            var repo ='';
            var markup ='';
            var start_pos ='';
            var end_pos ='';
            for(let a=1;a<=x;a++){
              n=n;
              if(a==1){
                repo=test;
                start_pos = repo.indexOf('|') + 1;
                end_pos = repo.indexOf('|Public|',start_pos);
                subStr = repo.substring(start_pos,end_pos);
                markup = "<a href='https://github.com/"+letter+"/"+ subStr +"' target='_blank'>"+subStr+"</a>";
                data.items.push(
                  {no: n, repository: markup}
                );
                repo = repo.replace('|'+subStr+'|Public|', "");
              } else {
                repo=repo;
                start_pos = repo.indexOf('|') + 1;
                end_pos = repo.indexOf('|Public|',start_pos);
                subStr = repo.substring(start_pos,end_pos);
                if (subStr.indexOf('|') != 0) {
                  subStr = subStr.split("|").pop();
                }
                markup = "<a href='https://github.com/"+letter+"/"+ subStr +"' target='_blank'>"+subStr+"</a>";
                data.items.push(
                  {no: n, repository: markup}
                );
                repo = repo.replace('|'+subStr+'|Public|', "");
              }
              n++;
            }
            i++;
            k=n;
            check_more(letter,i,k);
          }
        }
      });
    }

    function finish(){
      $('#example').dataTable().fnDestroy();
      $('#example')
      .on( 'draw.dt', function () {
        loader.classList.add('hide_read');
        } )
      .on( 'init.dt', function () {
        centerWrapper.classList.remove('hide_read');
        } ).dataTable({
        "processing": true,
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "autoWidth": true,
        "data": data.items,
        "columns": [{
            "title": "No",
            "data": "no"
        }, {
            "title": "Repository",
            "data": "repository"
        }]
      });
    }
  });
})(jQuery);