import React from 'react';

import './collection-overview.styles.scss';
import CollectionPreview from '../../components/collection-preview/collection-preview.component.jsx';
import { connect } from 'react-redux';


import { createStructuredSelector } from 'reselect';
import { selectCollections } from '../../redux/shop/shop.selectors';
const CollectionOverview = ({ collections }) => (


    <div className="collection-overview">
        {
            collections.map(
                ({ id, ...otherCollectionProps }) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                )

            )
        }
    </div>

)
const mapStateToProps = createStructuredSelector({

    collections: selectCollections
});

export default connect(mapStateToProps)(CollectionOverview);