// array methods
export function groupBy(arr, selector) {

    var dictionary = {};

    arr.forEach(function (element) {

        var consist = false;
        // key value
        var value = selector(element);

        for (let key in dictionary) {
            if (key == value) { consist = true; break; }
        }

        // add value to array
        if (consist) {
            dictionary[value].push(element)
        }
        // or create new key
        else {
            dictionary[value] = [element];
        }
    });

    for (let key in dictionary)
    {
        dictionary[key].sort(function (a, b) {
            return b.IMDB - a.IMDB;
        });
    }
    return dictionary;
}
export function intersect (arr1, arr2) {

    return arr1.reduce(function (resultArray, current) {    
        
        if (resultArray.indexOf(current) == -1 && arr2.indexOf(current) != -1)
        {
            resultArray.push(current)
        }
    
        return resultArray;
    }, [])
}

// help function for load data
function getData(url) {
    var xr = new XMLHttpRequest();
    xr.open("GET", url, false);
    xr.send();
    if (xr.status == 200)
    {
        return xr.responseText;
    }
}

// load data
var genres = [
  {
    name: "Crime",
    color: "red"
  },
  {
    name: "Drama",
    color: "green"
  },
  {
    name: "Action",
    color: "blue"
  },
  {
    name: "Adventure",
    color: "crimson"
  },

  {
    name: "Sci-Fi",
    color: "gold"
  },
  {
    name: "Comedy",
    color: "aqua"
  },
  {
    name: "Romance",
    color: "yellow"
  },
  {
    name: "Fantasy",
    color: "violet"
  },
  {
    name: "Thriller",
    color: "tomato"
  },
  {
    name: "Mystery",
    color: "teal"
  },
  {
    name: "Western",
    color: "tan"
  },
  {
    name: "War",
    color: "slateblue"
  },
  {
    name: "Biography",
    color: "skyblue"
  },
  {
    name: "History",
    color: "yellowgreen"
  },
  {
    name: "Animation",
    color: "indigo"
  },
  {
    name: "Family",
    color: "darkorange"
  },
  {
    name: "Horror",
    color: "darkred"
  },
  {
    name: "Sport",
    color: "orange"
  },
  {
    name: "Music",
    color: "lime"
  },
  {
    name: "Musical",
    color: "#ff558a"
  },
  {
    name: "Film-Noir",
    color: "chocolate"
  }
];

export {genres};