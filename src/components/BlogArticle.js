import React, { Component } from "react";

class BlogArticle extends Component {
  render() {
    return (
      <article className="blog-article">
        <p>
          The 20th anniversary of{" "}
          <span>
            <a href="https://www.amazon.com/gp/product/1328545431/ref=dbs_a_def_rwt_bibl_vppi_i0">
              How to Cook Everything by Mark Bittman
            </a>
          </span>{" "}
          is marked by this new edition with photographs by me! It was an honor
          to work on such a classic and essential book. We spent 3 weeks in NYC
          photographing hundreds of dishes and my crew,{" "}
          <span>
            <a href="http://www.victoriagranof.com/">Victoria Granof</a>
          </span>{" "}
          (food stylist extraordinaire),{" "}
          <span>
            <a href="https://www.michelekarpe.com/Philippa-Brathwaite/Portfolio/1">
              Philippa Brathwaite
            </a>
          </span>{" "}
          (prop stylist),{" "}
          <span>
            <a href="https://www.martynaszcz.com/">Martyna Szczesna</a>
          </span>{" "}
          (photo assistance), Kerri Conan, Stephanie Fletcher from Houghton
          Mifflin Harcourt made the job a dream. You can see more images from
          the book{" "}
          <span>
            <a href="http://www.ayabrackett.com/books/">HERE</a>
          </span>
        </p>
      </article>
    );
  }
}

export default BlogArticle;
